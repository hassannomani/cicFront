import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registrationForm = new FormGroup({
    'username' : new FormControl('',[Validators.required /*, Validators.pattern('[0-9]{12}$')*/]),
    'password' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'repassword' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'firstName':  new FormControl('',[Validators.required]),
    'lastName':  new FormControl('',[Validators.required]),
    'mobile':  new FormControl('',[Validators.required]),
  })
  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Log In"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private userService: UserService,
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,

  ){
    this.titleService.setTitle("Registration");
  }

  ngOnInit(): void {

  }

  register(){
    this.userService.addUsers(this.registrationForm.value).subscribe({
      next: (data) => {
        this.message = "Success"
        this.registrationForm.reset()
        this.openSnackBar()
      }
      ,
      error: (e) => {
        this.message = "Error occurred! Try again later1!"
        this.openSnackBar()
      }
    })    
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
}
