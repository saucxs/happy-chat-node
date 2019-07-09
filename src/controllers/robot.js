const request = require("request-promise");
const tulingApiKey = require('../config').tulingApiKey;

module.exports = async (ctx, next) => {
    console.log(tulingApiKey, '-=-=-=-=-=-=-=-=-=-=')
    let date = {
        key: tulingApiKey[0],
        info: "" + ctx.query.message,
        userid: "123456789"
    };
    let options = {
        method: "POST",
        uri: "http://www.tuling123.com/openapi/api",
        body: date,
        json: true // Automatically stringifies the body to JSON
    };
    const response = await request(options);
    console.log(response.code === 100000)
    if(response.code === 100000){
        ctx.body = {
            data: response
        };
    }else{
        let date = {
            key: tulingApiKey[1],
            info: "" + ctx.query.message,
            userid: "123456789"
        };
        let options = {
            method: "POST",
            uri: "http://www.tuling123.com/openapi/api",
            body: date,
            json: true // Automatically stringifies the body to JSON
        };
        const response = await request(options);
        if(response.code === 100000){
            ctx.body = {
                data: response
            };
        }
    }

};
