import { createReducer, on } from "@ngrx/store"
import { login } from "../objects/login";
import { loginAction, loginFailedAction, loginSuccessAction, logoutAction } from "src/app/actions/loginActions";


export const initial_login:login={
    logins:null,
    validuser:false,
    error:null,
    name:"",
    phoneno:""
}
const _userReducer=createReducer(initial_login,
    on(loginAction,(state,data)=>({...state,logins:data})),
    on(logoutAction,(state)=>({...state,logins:null,validuser:false, error:null,name:"",phoneno:""})),
    on(loginSuccessAction,(state,data)=>({...state,name:data.name,phoneno:data.phoneno,validuser:true})),
    on(loginFailedAction,(state,data)=>({...state,validuser:false,error:data.error.message})));

export function loginReducer(state=initial_login,action:any){
    return _userReducer(state,action);
} 