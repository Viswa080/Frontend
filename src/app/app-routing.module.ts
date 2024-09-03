import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { DetailsComponent } from './details/details.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';
import { UpdatePopUpComponent } from './update-pop-up/update-pop-up.component';
import { GenerateExcelComponent } from './generate-excel/generate-excel.component';
import { Practice2Component } from './practice2/practice2.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch:'full'},
{ path: 'billing', component: BillingComponent },
{ path: 'details', component: DetailsComponent  },
{ path: 'addproducts', component: AddproductsComponent  },
{ path: 'home', component: HomeComponent  },
{ path: 'practice', component: PracticeComponent  },
{ path: 'practice2', component: Practice2Component },
{ path: 'excelgenerate', component: GenerateExcelComponent  },
{ path: '**', redirectTo: 'home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
