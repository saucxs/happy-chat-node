const request = require("request-promise");
const tulingApiKey = require('../config').tulingApiKey;

module.exports = async (ctx, next) => {
    console.log(tulingApiKey, '-=-=-=-=-=-=-=-=-=-=')
    let date = {
        key: tulingApiKey[0],
        info: "" + ctx.query.message,
        userid: ctx.query.userId
    };
    console.log(date, '-----------------------')
    let options = {
        method: "POST",
        uri: "http://www.tuling123.com/openapi/api",
        body: date,
        json: true // Automatically stringifies the body to JSON
    };
    const response = await request(options);
    console.log(response,' 第1次返回')
    if(response.code === 100000){
        ctx.body = {
            data: response
        };
    }else{
        let date = {
            key: tulingApiKey[1],
            info: "" + ctx.query.message,
            userid: ctx.query.userId
        };
        let options = {
            method: "POST",
            uri: "http://www.tuling123.com/openapi/api",
            body: date,
            json: true // Automatically stringifies the body to JSON
        };
        const response = await request(options);
        console.log(response,' 第2次返回')
        if(response.code === 100000){
            ctx.body = {
                data: response
            };
        }else{
            let date = {
                key: tulingApiKey[2],
                info: "" + ctx.query.message,
                userid: ctx.query.userId
            };
            let options = {
                method: "POST",
                uri: "http://www.tuling123.com/openapi/api",
                body: date,
                json: true // Automatically stringifies the body to JSON
            };
            const response = await request(options);
            console.log(response,' 第3次返回')
            if(response.code === 100000){
                ctx.body = {
                    data: response
                };
            }else{
                let date = {
                    key: tulingApiKey[3],
                    info: "" + ctx.query.message,
                    userid: ctx.query.userId
                };
                let options = {
                    method: "POST",
                    uri: "http://www.tuling123.com/openapi/api",
                    body: date,
                    json: true // Automatically stringifies the body to JSON
                };
                const response = await request(options);
                console.log(response,' 第4次返回')
                ctx.body = {
                    data: response
                };
            }
        }
    }
};
