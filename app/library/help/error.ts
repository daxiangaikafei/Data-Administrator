


class Error {
    constructor(whoami:string) {
        this.code = 1;
        this.message = "";
        this.whoami = "";
        this.getValue = this.getValue.bind(this);
    }
    private code : number;
    private message : string;
    private whoami : string;
    set(code:number,message:any){
        this.code = code;
        this.message = message;
        return this.getValue();
    }
    private getValue() {
        return {code:this.code, message:this.message, whoami:this.whoami}
    }
}

export default Error;