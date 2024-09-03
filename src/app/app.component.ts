import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginAction, loginSuccessAction, loginFailedAction, logoutAction } from './actions/loginActions';
import { logincreds } from './objects/login';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  creds : logincreds=new logincreds();
  validity:boolean=false;
  name:string="";
  errormessage:string="";
  timelimit:boolean=false;

  constructor(private apicalls:ApiService,private store:Store<any>) { 
    store.select('login').subscribe(
      data=>{
        this.name=String(data.name);
        this.validity=true//data.validuser;
        this.errormessage=data.error;
        console.log("from selector")
        console.log(data)
      }  
    )
  }
 loginCheck(){
    this.apicalls.checklogin(this.creds).subscribe({
      next: (data) => {  
        console.log("Triggered")
        this.store.dispatch(loginAction(data));
        this.store.dispatch(loginSuccessAction(data))
        this.creds.password="";
        },
      error: (error) => {
        console.log(typeof(error.error.message))
        console.log(error.error.message)
        this.creds.password="";
        this.store.dispatch(loginFailedAction((error)));
        this.timelimit=true;
        setTimeout(() => {this.timelimit = false; }, 3000);
      }, 
      complete: () => {console.log("data stream completed")}
     }) 
  }
  logOut(){
    console.log("Clicked on Logout")
    this.store.dispatch(logoutAction());
  }

}