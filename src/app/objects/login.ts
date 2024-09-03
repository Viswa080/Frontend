export class logincreds {
    userid: string='';
    password: string='';
  }
export interface login{
    logins:logincreds|null;
    validuser:boolean;
    error:any;
    name:string;
    phoneno:string;
}