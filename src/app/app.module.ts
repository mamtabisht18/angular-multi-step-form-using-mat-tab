import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormReviewComponent } from './components/form-review/form-review.component';
import { CardSeperatorPipe } from './pipes/card-seperator.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    FormReviewComponent,
    CardSeperatorPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
