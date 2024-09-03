import { Component } from '@angular/core';
import { billing } from '../objects/billing';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    
    ID:string="";
    prod: billing=new billing();
    typeofid:string="";
    isproduct:string="";
    productstatus:any;
    successmessage:any;
    errormessage:any;
    timelimit:boolean=false;
    listofprods:billing[]|any;
    updateProduct:boolean=false;
    productset = new Map();
  
    constructor(private apicalls:ApiService){};
  
    getproductdetails(input:string){
      if(!input){
        this.errormessage="Please provide ID";
        this.settimelimit();
         return;}
      if(this.typeofid==='product'){
        this.isproduct="product"
        this.apicalls.getproductdetails(input).subscribe({
          next: (data:billing) =>{ 
            this.prod=data;
            this.errormessage="";
            if(data.productsoldcost==0){this.productstatus="Available";}
            else{
              this.productstatus="Sold";
            }
               },
          error: (error)=>{
            this.errormessage=error.error.message+" : "+this.ID;
            this.settimelimit();
          }
        });
  
      }else if (this.typeofid==='bill'){
        this.apicalls.getbilldetails(input).subscribe({
          next: (data:billing[]) =>{ 
            this.listofprods=data;
            this.isproduct="bill";
          },
          error: (error)=>{
            this.errormessage=error.error.message+" : "+this.ID;
            this.settimelimit();
          }
        });
      }else{
        this.errormessage="Please select the type of ID";
        this.settimelimit();
      }
      
    }
  UpdateProductDetails(input:billing){
      this.apicalls.updateProduct(this.prod).subscribe({
        next: (data:number) =>{ 
          this.prod=input;
          this.isproduct="product"
          this.updateProduct=false;
          this.successmessage="Product with ID:"+ data+" has been Updated Successfully";
        },
        error: (error)=>{
          this.errormessage=error.error.message;
          
        }
      }); 
      this.settimelimit();
    }
  enableUpdate(){
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
