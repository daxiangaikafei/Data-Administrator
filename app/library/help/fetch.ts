import {size} from "lodash";
//import {FormData} from 'whatwg-fetch'
import "isomorphic-fetch";

var FormData = require('isomorphic-form-data');

class Fetch {
    constructor(domain : string, timeout : number = 5000) {
        this.domain = domain;
        this.timeout = timeout;
    }
    setDomain(domain : string) {
        this.domain = domain;
    }
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    //设置头部信息
    setHeaders(headers = {'client_version': "1.0", 'channel': 'node'}) {
        this.headers = Object.assign({
            'charset': 'utf-8',
            'client_version': "1.0",
            'channel': 'node'
        }, headers)
    }
    //设置版本号
    setVersion(version : string) {
        this.headers['client_version'] = version;
    }
    private headers : any = {
        'charset': 'utf-8',
        'client_version': "1.0",
        'channel': 'node'
    };
    private domain : string;
    private timeout : number;
    getData(url : string, param = {}, type = "GET", headers?: any, repType = "json", timeout?: any) {
        type = type.toLocaleUpperCase();
        if (type === "GET" && size(param) > 0) {
            url += "?" + toExcString(param)
        }
        headers = getHeadersByRepType(repType, Object.assign({},this.headers,headers));
       // console.log(headers);
        let body = getDataByRepType(repType, param);
        return timeoutPromise(timeout || this.timeout, fetch(this.domain + url, {
            method: type,
            headers: headers,
            //credentials: 'same-origin',
            body: (type === "GET"
                ? undefined
                : body)
        }).then((res) => {
            console.log("fetxhUrl:"+url)
            return res.json()
        }).catch((e) => {
            console.log(e);
        }));
    }
}

const Headers = require("./headers");

const getHeadersByRepType = function (repType, headers) {
    return Object.assign({},headers, Headers[repType]);
}

//根据请求类型，获取请求数据
const getDataByRepType = function (repType, param) {
    let body;
    switch (repType) {
        case "json":
            body = JSON.stringify(param);
            break;
        case "form-data":
            body = new FormData();
            for (let key in param) {
                body.append(key, param[key]);
            }
            break;
        default:
            body = param;
            break;
    }

    return body;
}

const timeoutPromise = function (ms, promise) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error("promise timeout"))
        }, ms);
        promise.then((res) => {
            clearTimeout(timeoutId);
            resolve(res);
        }, (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    })
}

const toExcString = function (array, type = {
    ":": "=",
    ",": "&"
}) {

    let result = "";
    for (var temp in array) {
        result += temp + '=' + encodeURI(array[temp]) + "&"
    }
    return result.substring(-1, result.length - 1);
}

export default Fetch;
