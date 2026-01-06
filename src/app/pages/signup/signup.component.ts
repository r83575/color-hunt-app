import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
private readonly frmBuilder = inject(FormBuilder)
  signUpForm: FormGroup

  constructor() {
    this.signUpForm = this.frmBuilder.group({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      agree: new FormControl(false,[Validators.requiredTrue])
    })
  }

  create(){
    console.log(this.signUpForm);    
  }
}
