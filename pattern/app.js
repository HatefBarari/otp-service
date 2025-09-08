			const request = require('request');
                        request.post({
                            url: 'http://ippanel.com/api/select',
                            body: {
					"op":"pattern",
					"user":"YOUR_USERNAME",
					"pass":"YOUR_PASSWORD",
					"fromNum":"1000XXXX",
					"toNum":"YOUR_STRING_DESTINATION_NUMBER",
					"patternCode":"YOUR_PATTERN_ID",
					"inputData":[
							{"code":3000},
							{"brand":"bmw"}		
						]
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
