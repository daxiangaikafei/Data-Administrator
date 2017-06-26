const querystring = require('querystring');
const url = require('url');
const nodeEmail = require('nodemailer');

const hostConf: any = {
    host: "smtp.126.com",
    port: 465,
    user: "wangqingzhu36@126.com",
    pass: ""
};
const whiteList: any = {
    list: [
        "wangqingzhu1025@126.com"
    ]
};

const email: any = nodeEmail.createTransport({
    host: hostConf['host'],
    port: hostConf['port'],
    secure: true,
    auth: {
        user: hostConf['user'],
        pass: hostConf['pass']
    }
});
const emailRgx: any = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/;

const pageTools = (function () {
    return {
        template: function (content, type) {
            let strAry = [];
            if (!type || (type === '0')) {
                strAry = [
                    '<html>',
                    '  <head><meta charset="utf-8"></head>',
                    '  <body>' + (content || '') + '</body>',
                    '</html>'
                ]
            }
            return strAry.join('');
        },

        resultJSON: function (ary) {
            return {
                success: ary[0],
                code: ary[1],
                message: ary[2]
            };
        }
    }
})();

export const sendWarn = function (ctx, conf) {
    let req: any = ctx.request;
    let res: any = ctx.response;
    let params: any = ctx.query;


    if (params.email) {
        if (!emailRgx.test(params.email)) {
            ctx.body = JSON.stringify(pageTools.resultJSON([
                true, 0, '非邮箱地址'
            ]));
        } else if (!(whiteList.list.join('|').indexOf(params.email) < 0)) {
            email.sendMail({
                from: hostConf['user'],
                to: params.email,
                subject: params.subject,
                html: pageTools.template(params.content, params.type)
            }, function (error, success) {
                let jsonData: any = [];

                if (!error) {
                    jsonData = [
                        true, -1, '发送成功'
                    ];
                } else {
                    jsonData = [
                        false, 500, '网络失败'
                    ];
                }
                ctx.body = JSON.stringify(pageTools.resultJSON(jsonData));
            });
        } else {
            ctx.body = JSON.stringify(pageTools.resultJSON([
                true, 1, '非白名单'
            ]));
        }
    } else {
        ctx.body = JSON.stringify(pageTools.resultJSON([
            false, 1000, '非法请求'
        ]));
    }
};