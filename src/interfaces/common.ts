export interface IErrorResponse {
    response?:{
        data?:{
            save:boolean;
            msg?:string;
            session?: boolean;
            status:boolean;
        }
    };
    message?:string;
}

export interface IEventCallback {
    message : string | boolean;
}