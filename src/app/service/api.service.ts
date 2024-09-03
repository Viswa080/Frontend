import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { billing } from 'src/app/objects/billing';
import { logincreds } from 'src/app/objects/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  domain:string = "localhost";
  portnumber:string="4801";
  bepn:string="BatJPA";    //saves back end application portal name

  checklogin(input : logincreds) : Observable<any>{
    console.log("triggered service");
    return <Observable<any>> this.http.post('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/login',input);
  }
  getproductdetails(input:string):Observable<any>{
    return <Observable<any>> this.http.get('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/getproduct/'+input);
  }
  generatebill(custname:string, billlist : billing[],discount :string):Observable<any>{
    return <Observable<any>> this.http.post('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/makebilling/'+custname+'/'+discount,billlist);
  }
  generateexcel(date:string,month:string, year:string){
    console.log(date+"-"+month+"-"+year+" before call");
     window.open('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/productdetailsexcel/'+date+'/'+month+'/'+year,"_blank");
  }
  addrecordstoDB(billlist:billing[]):Observable<any>{
    return <Observable<any>> this.http.post('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/loadproducts',billlist);
  }
  getbilldetails(input:string):Observable<any>{
    return <Observable<any>> this.http.get('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/getbill/'+input);
  }
  updateProduct(input:billing):Observable<any>{
    return <Observable<any>> this.http.post('http://'+this.domain+':'+this.portnumber+'/' +this.bepn+'/updateproduct',input);
  }

}
