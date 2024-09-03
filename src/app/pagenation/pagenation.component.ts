import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagenation',
  templateUrl: './pagenation.component.html',
  styleUrls: ['./pagenation.component.css']
})
export class PagenationComponent {
  @Input() totalItems:any;
  @Input() currentPage:any;
  @Input() itemsPerPage:any;
  @Output() OnPageClick:EventEmitter<number>= new EventEmitter();
  totalPages=0;
  pages:number[]=[];
  constructor(){}
  ngOnInit() {
    if(this.totalItems)this.totalPages= Math.ceil(this.totalItems/this.itemsPerPage);
    console.log("triggered pagination")
    this.pages=Array.from({length:this.totalPages},(P,i)=>i+1);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalItems']){this.totalPages= Math.ceil(this.totalItems/this.itemsPerPage);this.pages=Array.from({length:this.totalPages},(P,i)=>i+1);this.currentPage=1;}
    
  }
  modifyPage(page:number){
    this.OnPageClick.emit(page);
  }
}
