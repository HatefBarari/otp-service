const request = require("request");
const otpModel = require("./../model/otp");
const cron = require("node-cron");

// حذف اسنادی که زمان expireAt کمتر از زمان فعلی است
cron.schedule("*/3 * * * *", async () => {
  const now = new Date().getTime(); // زمان فعلی به صورت timestamp در میلی‌ثانیه
  try {
    // حذف اسنادی که زمان expireAt آن‌ها کمتر از زمان فعلی است
    await otpModel.deleteMany({ expireAt: { $lt: now } });
    // const result = await otpModel.deleteMany({ expireAt: { $lt: now } });
    // console.log(`${result.deletedCount} expired documents removed.`);
  } catch (error) {
    console.error("Error deleting expired documents:", error);
  }
});
//////////////////////////////////////////////////////////////////////////////
exports.sendOtp = async (req, res) => {
  const iranMobileRegex = /^(?:\+98|98|0)?9\d{9}$/;
  const { phone } = req.body;
  const code = Math.floor(10000 + Math.random() * 90000);
  const now = new Date();
  const expireAt = now.getTime() + 180_000; // 3 Min

  // console.log("OTP Code ->", code);

  if (!iranMobileRegex.test(phone)) {
    return res.status(400).json({ message: "شماره نامعتبر است" });
  }
  await otpModel.deleteOne({ phone, expireAt: { $lt: now.getTime() } });
  const isExistPhone = await otpModel.findOne({ phone }).lean();

  if (isExistPhone) {
    return res.status(409).json({ message: "کد قبلا ارسال شده است" });
  }
  try {
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "u09149532509",
          pass: "Faraz@1876795040541015",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "yuwaicf8ms7c4sj", // j
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(response.body);
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          if (
            response.body === undefined ||
            typeof response.body !== "number" ||
            (typeof response.body === "object" &&
              Number(response.body[0]) !== 0)
          ) {
            console.log(response.body);
            return res.status(500).json({
              message:
                response.body === undefined
                  ? "خطا در ارسال کد"
                  : typeof response.body === "object"
                  ? response.body[1]
                  : response.body,
            });
          }
          await otpModel.create({ code, phone, expireAt });
          console.log(response.body);
          return res.json({ message: "OTP Code sent successfully :))" });
        } else {
          console.log("whatever you want");
        }
      }
    );
  } catch (err) {
    return new Error(err);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { code, phone } = req.body;
    const otp = await otpModel
      .findOneAndUpdate(
        { phone },
        {
          $inc: {
            uses: 1,
          },
        },
        { new: true }
      )
      .lean();
    if (otp) {
      const date = new Date();
      const now = date.getTime();
      if (otp.expireAt < now) {
        return res.status(410).json({
          message: "کد منقضی شده است، لطفا دوباره درخواست کد جدید بدهید",
        });
      }
      if (otp.uses > 3) {
        return res.status(409).json({
          message:
            "شما حداکثر 3 تلاش ناموفق داشتید، بعد از 3 دقیقه دوباره تلاش کنید",
        });
      }
      if (otp.code !== code) {
        return res.status(409).json({ message: "کد صحیح نمی باشد" });
      }

      await otpModel.findByIdAndUpdate(otp._id, { isConfirmed: true }); // اگر کد صحیح بود تایید میشه
      return res.status(200).json({ message: "کد صحیح است" });
    } else {
      return res.status(409).json({
        message: "شماره موبایل یافت نشد لطفا دوباره تلاش کنید",
      });
    }
  } catch (error) {
    return new Error(error);
  }
};
