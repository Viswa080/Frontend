import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-generate-excel',
  templateUrl: './generate-excel.component.html',
  styleUrls: ['./generate-excel.component.css']
})
export class GenerateExcelComponent {
  months:string[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
  years:string[]=['2023','2024'];
  year:string="";
  month:string="";
  day:string='';
  choosenDate!: Date;
  successmessage:string='';
  errormessage:string='';

  constructor(private apicalls:ApiService){};

  selectDate(event:MatDatepickerInputEvent<Date>):void{
    if(event.value!==null){
     this.choosenDate=event.value;
      this.day=this.choosenDate.getDate().toString();
      this.month=(this.choosenDate.getMonth()+1).toString().padStart(2,'0');
      this.year=this.choosenDate.getFullYear().toString();
    }
  }
  generateexcelfile(day:string,month:string, year:string){
    //Date Selection
    if(year=='0000'){
      console.log(this.day+"-"+this.month+"-"+this.year);
      this.apicalls.generateexcel(this.day,this.month, this.year);
      return;
    }
     if(month!='00'){
      (month=(this.months.indexOf(month)+1).toString().padStart(2,'0'));
      
    }
    console.log(day+"-"+month+"-"+year);
   this.apicalls.generateexcel(day,month, year);
  }
}
