export class Response{
    constructor(message, info, error){
        this.message = message;
        this.info = info;
        this.error = error;
    }

    get json(){
        return {
            message: this.message,
            info: this.info ? this.info : {},
            error: this.error
        }
    }
}