			const request = require('request');
                        request.post({
                            url: 'http://ippanel.com/api/select',
                            body: {
					"op" : "send",
					"uname" : "YOUR_USERNAME",
					"pass":  "YOUR_PASSWORD",
					"message" : "salam",
					"from": "1000XXX",
					"to" : ["936xxxxx","912xxxx"],

				},
                            json: true,
                        }, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
				//YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
                                console.log(response.body);
                            } else {
				console.log("whatever you want");
                            
                            }
                        });
