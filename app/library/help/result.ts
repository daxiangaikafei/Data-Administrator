interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}



const config:Config = require("./../../config/index");

const Error = config.error;
class Result {
    constructor() {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = {};
        this.getValue = this.getValue.bind(this);
    }
    private resultCode : number;
    private resultMessage : string;
    private result : any;
    success(result ?: any) {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = result;
        return this.getValue();
    }
    error(code : number=1, errorMsg ?: string) {
        this.resultCode = code;
        this.resultMessage = Error[code]||errorMsg;
        return this.getValue();
    }
    getValue() {
        let resultCode = this.resultCode;
        let resultMessage = this.resultMessage;
        let result = this.result;
        return {code:resultCode, message:resultMessage, result}
    }
}

export default Result;