import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { FormReviewComponent } from '../form-review/form-review.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  myForm: FormGroup;
  selectedIndex = 0
  @ViewChild('tabGroup', {static: false}) tabGroup;
  maxIndex = 0
  isShiipingDisabled =  true
  isPaymentDisabled  = true
  isAddressSame = 'Y'

  private conditionalValidators = []

  constructor(
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      0: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', [Validators.required]],
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        isShippingSameAsBilling: ['Y'],
        shippingAddressLine1: ['',this.conditionalValidators],
        shippingAddressLine2: ['', this.conditionalValidators],
      }),
      1 : this.fb.group({
        shippingAddress : ['2', Validators.required],
      }),
      2 : this.fb.group({
        cardNumber : ['', [Validators.required,Validators.minLength(19), Validators.maxLength(19)]],
        cardExpiryDate : ['', Validators.required],
        cardCvvNumber : ['', [Validators.required,Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]*')]],
      }),
    })

    // this.isShiipingDisabled = this.myForm.get('0').status === 'INVALID' ? true : false

    // this.myForm.get('0').statusChanges.subscribe(
    //   (status) =>{
    //     if(status === 'VALID'){
    //       this.isShiipingDisabled = false
    //     } else {
    //       this.isShiipingDisabled = true
    //     }
    //   }
    // )
      
    // this.isPaymentDisabled = this.isShiipingDisabled ? true : false
    // this.myForm.get('1').statusChanges.subscribe(
    //   (status) =>{
    //     if(status === 'VALID'){
    //       this.isPaymentDisabled = false
    //     } else {
    //       this.isPaymentDisabled = true
    //     }
    //   }
    // )

    combineLatest(this.myForm.get('0').statusChanges.pipe(startWith(this.myForm.get('0').status)), this.myForm.get('1').statusChanges.pipe(startWith(this.myForm.get('1').status))
             ).subscribe(
               ([s1, s2]) => {
                 if(s1 === 'VALID') {
                  this.isShiipingDisabled = false
                 } else {
                   this.isShiipingDisabled = true
                 }
                 if(s2 === 'VALID' && !this.isShiipingDisabled) {
                  this.isPaymentDisabled = false
                 } else {
                   this.isPaymentDisabled = true
                 }
               }
             )

    this.myForm.get('0.isShippingSameAsBilling').valueChanges.subscribe(
      (value) => {
        if(value === 'N') {
          this.myForm.get('0.shippingAddressLine1').setValidators(this.conditionalValidators.concat(Validators.required))
        } else if(value === 'Y') {
          this.myForm.get('0.shippingAddressLine1').setValidators(this.conditionalValidators)
          this.myForm.get('0.shippingAddressLine1').setErrors(null)
        }
      }
    )
  }

  submit() {
    if(this.myForm.status === 'VALID') {
      // console.log(this.myForm.controls)
      this.openDialog()
    }
  }

  reset(){
    this.myForm.get(`${this.selectedIndex}`).reset()
  }

  prev(){
    this.selectedIndex--
  }

  next(){
    if(this.myForm.controls[this.selectedIndex].status === 'INVALID') {

    } else {
      this.selectedIndex++
    }
  }

  showAddress(){
    if(this.isAddressSame === 'Y'){
      this.isAddressSame = 'N'
    } else {
      this.isAddressSame = 'Y'
    }
    this.myForm.get('0.isShippingSameAsBilling').setValue(this.isAddressSame)
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormReviewComponent,{
      data: {
        reviewData: this.myForm.value
      }
    })
  }

  ngAfterViewInit(){
    this.maxIndex = this.tabGroup._tabs.length
    this.cd.detectChanges()
  }

}
