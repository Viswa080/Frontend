import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { billing } from '../objects/billing';

@Component({
  selector: 'app-update-pop-up',
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css']
})
export class UpdatePopUpComponent implements OnInit {
  @Input()
  productdetails:billing=new billing();
  @Output()
  cancelUpdateData= new EventEmitter<boolean>();
  @Output()
  productUpdate= new EventEmitter<billing>();


  ngOnInit(): void {
    console.log(this.productdetails);
  }
  updateDetails(){
    //console.log("clicked on Update")
    this.productUpdate.emit(this.productdetails);
  }
  cancelUpdate(){
    //console.log("clicked on cancel")
    this.cancelUpdateData.emit(false);
  }

}
