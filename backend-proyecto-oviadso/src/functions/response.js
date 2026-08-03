export class Response{
    constructor(status, message, info, error){
        this.status = status;
        this.message = message;
        this.info = info;
        this.error = error;
    }

    get json(){
        return {
            success: this.status,
            message: this.message,
            info: this.info ? this.info : {},
            error: this.error
        }
    }
    get success(){
        return {
            success: true,
            code: 0,
            message: this.message,
            info: this.info ? this.info : {},
            error: this.error
        }
    }
}