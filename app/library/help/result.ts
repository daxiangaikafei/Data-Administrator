



const config :any= require("./../../config/index");
const Errors = config.error;

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
    success(result ?: any,message="success") {
        this.resultCode = 0;
        this.resultMessage = message;
        this.result = result;
        return this.getValue();
    }
    error(code : number=1, errorMsg ?: string) {
        this.resultCode = code;
        this.resultMessage = Errors[code]||errorMsg;
        return this.getValue();
    }
    setError(error){
        this.resultCode = error.code;
        this.resultMessage = error.message;
         this.result = undefined;
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