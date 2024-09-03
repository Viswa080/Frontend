import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { billing } from '../objects/billing';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit,AfterViewInit,OnChanges{
  displayedColumns: string[] = ['index','productid', 'productname','productcategory', 'color', 'productsoldcost','productcomedate'];
  showFiller = false;
  errormessage:string="";
  successmessage:string="";
  timelimit:boolean=false;
  filteringData: billing=new billing();
  rowsPerPage=10;
  pageNo=1;
  dataSourceView:any;
  showpage:boolean=false;
  dataSource : billing[] = [];
  @Input() originalData: billing[] = [];
  @ViewChild(MatSort)matsort!: MatSort;   //static is used to initialize matsort before the Oninit
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  editing:{row:number,field:string}={row:-1,field:''};

  constructor(private apicalls:ApiService){
  }
  ngOnChanges(): void {
    this.dataSource=this.originalData;
    this.pagenatedData();
    console.log(this.originalData);
  }
  
  ngAfterViewInit(): void {
    this.dataSourceView.sort=this.matsort;
    this.dataSourceView.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource=this.originalData;
    this.pagenatedData();
  }
  pagenatedData(){
    const start = (this.pageNo-1)*this.rowsPerPage;
    //this.dataSourceView = new MatTableDataSource(this.dataSource.slice(start, start+this.rowsPerPage));
    this.dataSourceView = new MatTableDataSource(this.dataSource);
    this.dataSourceView.sort=this.matsort;
  }
  settimelimit(){
      this.timelimit = true;
      setTimeout(() => {this.timelimit = false; }, 3000);
  }

  changePage(page:number){
      this.pageNo=page;
      this.pagenatedData(); 
  }

  applyFilters(input:billing) {
      //console.log(input);
      this.dataSource=this.originalData;
      if(input.productid)this.dataSource=this.originalData.filter(obj=>String(obj.productid).includes(String(input.productid)))
      if(input.productname)this.dataSource=this.dataSource.filter(obj=>String(obj.productname).includes(String(input.productname)))
      if(input.productcategory)this.dataSource=this.dataSource.filter(obj=>String(obj.productcategory).includes(String(input.productcategory)))
      if(input.color)this.dataSource=this.dataSource.filter(obj=>String(obj.color).includes(String(input.color)))
      if(input.productmarkedcost)this.dataSource=this.dataSource.filter(obj=>String(obj.productmarkedcost).includes(String(input.productmarkedcost)))
      if(input.productsoldcost)this.dataSource=this.dataSource.filter(obj=>String(obj.productsoldcost).includes(String(input.productsoldcost)))
      if(input.productcomedate)this.dataSource=this.dataSource.filter(obj=>String(obj.productcomedate).includes(String(input.productcomedate)))
      //console.log(this.dataSource)
      this.pagenatedData();
  }

  removeFilters() {
      this.dataSource=this.originalData;
      this.filteringData=new billing();
      this.pagenatedData();
  }

  editField(input:string,row:number) {
      this.editing.row=row;this.editing.field=input;
  }

  stopEdit(input:billing){
    console.log(input)
    this.apicalls.updateProduct(input).subscribe({
          next: (data:number) =>{ 
            this.successmessage="Product with ID:"+ data+" has been Updated Successfully";
          },
          error: (error)=>{
            this.errormessage=error.error.message;
            
          }
        }); 
        this.settimelimit();
        this.editing.row=-1;this.editing.field='';
  }
}
