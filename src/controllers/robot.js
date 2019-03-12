const request = require("request-promise");

module.exports = async (ctx, next) => {
    const date = {
        key: "59a31c071473407e959128f78a445864",
        info: "" + ctx.query.message,
        userid: "123456789"
    };

    const options = {
        method: "POST",
        uri: "http://www.tuling123.com/openapi/api",
        body: date,
        json: true // Automatically stringifies the body to JSON
    };
    const response = await request(options);
    console.log(response);
    ctx.body = {
        data: response
    };
};
