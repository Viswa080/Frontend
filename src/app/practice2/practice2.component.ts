import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-practice2',
  templateUrl: './practice2.component.html',
  styleUrls: ['./practice2.component.css']
})
export class Practice2Component implements OnInit{

  displayedColumns: string[] = ['productid', 'productname'];
  dataSourceView : any;
  errormessage: string='';
  @ViewChild(MatSort)matsort!: MatSort;

  constructor(private apicalls:ApiService){};

  ngOnInit(): void {
    this.apicalls.getbilldetails('400').subscribe({
      next: (data) =>{ 
        this.dataSourceView = new MatTableDataSource(data);
        this.dataSourceView.sort=this.matsort;
        console.log(this.dataSourceView);
      },
      error: (error)=>{
        this.errormessage=error.error.message;
        console.log(this.errormessage)
      }
    });
  }
}
