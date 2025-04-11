
export default class ApiResponse<T extends any> {
    data!: T;
    meta: any;
    message!: string;
    status!: number;
    statusText!: string;
    headers!: any;
    config!: any;
    request?: any;
    
}