import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/loginReducer';
import { BillingComponent } from './billing/billing.component';
import { DetailsComponent } from './details/details.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { HomeComponent } from './home/home.component';
import {MatTableModule} from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PracticeComponent } from './practice/practice.component';
import { PagenationComponent } from './pagenation/pagenation.component';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { UniquePipe } from './pipes/unique.pipe';
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdatePopUpComponent } from './update-pop-up/update-pop-up.component';
import {MatCardModule} from '@angular/material/card';
import { GenerateExcelComponent } from './generate-excel/generate-excel.component';
import {MatSortModule} from '@angular/material/sort';
import { Practice2Component } from './practice2/practice2.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    DetailsComponent,
    AddproductsComponent,
    HomeComponent,
    PracticeComponent,
    PagenationComponent,
    UniquePipe,
    PopUpComponent,
    UpdatePopUpComponent,
    GenerateExcelComponent,
    Practice2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSidenavModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    StoreModule.forRoot({login:loginReducer}),
    NoopAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
