import { createAction,props } from "@ngrx/store";

export const loginAction=createAction('user-valid',props<{userid: string,password: string}>());
export const logoutAction=createAction('user-invalid');
export const loginSuccessAction=createAction('login-success',props<{name: string,phoneno: string}>());
export const loginFailedAction=createAction('login-failed',props<{error:any}>());
export const Updateemaildetails=createAction('userdetails',props<{name: string,phoneno: string,email:string,message:string}>());