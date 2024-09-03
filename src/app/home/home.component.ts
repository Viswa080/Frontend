import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../objects/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name:string=""
  timelimit:boolean=false;
  successmessage:string="Successfully logged in with the User : ";
  constructor(private store:Store<any>) { 
    store.select('login').subscribe(
      data=>{
        this.name=data.name;
        this.timelimit=true;
        this.successmessage=this.successmessage+this.name;
      }  
    )
    setTimeout(() => {this.timelimit = false; }, 3000);
  }
}
