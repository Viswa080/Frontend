import { Component } from '@angular/core';
import { billing } from '../objects/billing';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  billlist: billing[]=[];
  searchid:string="";
  successmessage:string="";
  errormessage:string="";
  discountpercent!: number;
  totalmrp:number=0;
  customername:string="";
  discountcode:string ="";
  color:string="";
  timelimit:boolean=false;
  updatingproduct!: billing;
  updateProduct:boolean=false;
  
  
  constructor(private apicalls:ApiService){};

  add(input:string):void{
    console.log(input)
    if(!input){
      this.errormessage="Please enter product ID";
      this.settimelimit();
      return;
    }
      this.apicalls.getproductdetails(input).subscribe({
      next: (data) => {  if(data.productsoldcost==0){
        console.log(data.productsoldcost)
        this.billlist.push(data);
        this.totalmrp+=data.productmarkedcost;
        this.errormessage="";
        this.searchid="";
      }else{
        this.errormessage="Product was already sold.";
        this.settimelimit();
      }},
      error: (error) => {
        this.errormessage=error.error.message;
        this.settimelimit();
      }, 
      complete: () => {console.log("data stream completed")}
   })
  }
  removerow(input:number){
    this.successmessage="Successfully removed the Product: "+this.billlist[input].productid;
    this.totalmrp-=this.billlist[input].productmarkedcost;
    this.billlist.splice(input,1);
    this.settimelimit();
  }
  clearall(){
    this.totalmrp=0;
    this.billlist.splice(0,this.billlist.length);
    this.successmessage="Successfully removed all Products";
    this.settimelimit();
  }
  generatebill(){
    if(!this.customername){
      this.errormessage="Please enter Customer Name/ Phone.No";
      this.settimelimit();
      return;
    }
    if(this.discountpercent==20){this.discountcode='HO';}
    else if(this.discountpercent==15){this.discountcode='IT';}
    else if (this.discountpercent==10){this.discountcode='PD';}
    this.apicalls.generatebill(this.customername,this.billlist,this.discountcode).subscribe({
      next: (data) => {  this.successmessage="Bill was generated with total amount of :"+data;
                          this.settimelimit();
                          this.billlist=[];
                          this.customername="";
                          this.discountpercent=0;
                          this.totalmrp=0;
                          this.color="";}, 
      error: (error) => { this.errormessage=error.error.message}, 
      complete: () => {console.log("data stream completed")}
   });
  }
  UpdateProductDetails(input:billing){
    console.log(input);
     this.apicalls.updateProduct(input).subscribe({
       next: (data:number) =>{ 
         this.updateProduct=false;
        this.successmessage="Product with ID:"+ data +" has been Updated Successfully";
      },
      error: (error)=>{
        this.errormessage=error.error.message;
        
      }
    }
    ); 
    this.settimelimit();
  }
enableUpdate(input:billing){
  this.updatingproduct=input;
  this.updateProduct=true;
}
disableUpdate(){
  this.updateProduct=false;
}
settimelimit(){
  this.timelimit = true;
  setTimeout(() => {this.timelimit = false; }, 3000);
}
}
