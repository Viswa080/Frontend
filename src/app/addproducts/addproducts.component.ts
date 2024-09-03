import { Component } from '@angular/core';
import { billing } from '../objects/billing';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent {
  savedetails:boolean=false;
  product:billing=new billing;
  productlist:billing[]=[];
  PN:any='';
  PT:any='';
  PC:any='';
  mrp:any='';
  successmessage:string='';
  errormessage:string='';
  timelimit:boolean=false;
  
   constructor(private apicalls:ApiService){ }
  
  additem(product:billing){
    if(this.product.productname!=""&&this.product.producttype!=""&&this.product.productcategory!=""&&this.product.productmarkedcost!=0&&this.product.color!=""){
    this.productlist.push(product);
    console.log(this.product);
    if(this.savedetails==true){
      this.PN=this.product.productname;
      this.PT=this.product.producttype;
      this.PC=this.product.productcategory;
      this.mrp=this.product.productmarkedcost;
      this.product=new billing;
      this.product.productname= this.PN;
      this.product.producttype=this.PT;
      this.product.productcategory=this.PC;
      this.product.productmarkedcost=this.mrp;
    }else{
      this.product=new billing;
    }}else{
      this.errormessage='Please fill all the details';
      this.settimelimit();
    }
  }
  
   removerow(input:number){
    this.productlist.splice(input,1);
   }
   
   clearall(){
    this.productlist.splice(0,this.productlist.length);
    console.log(this.savedetails);
    this.product.productname='';
    this.product.producttype='';
    this.product.productcategory='';
    this.product.productmarkedcost=0;
  }
  
  senddata(input:billing[]){
    console.log(input)
    if(input.length!=0){
      this.apicalls.addrecordstoDB(input).subscribe(
        data=>{ 
        this.successmessage="Given "+data+" records were added to the Database.";
        this.settimelimit();
        this.productlist=[];
      },
        error=>{this.errormessage=error.error.message}
    );
    }else{
      this.errormessage="Please select records to be added.";
      this.settimelimit();
    }
    
  }
  settimelimit(){
    this.timelimit = true;
    setTimeout(() => {this.timelimit = false; }, 3000);
  }
}
