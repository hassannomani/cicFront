import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SigninService } from 'src/app/services/signin-service/signin.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    'username' : new FormControl('',[Validators.required /*, Validators.pattern('[0-9]{12}$')*/]),
    'password' : new FormControl('',[Validators.required, Validators.minLength(4)])
  })
  failed: boolean = false
  buttonLabel: string= "Log In"
  buttonLabel2: string= "Registration"
  buttonColor: string = "primary"
  buttonType: string = "submit"
  buttonType2: string = "button"
  errorMsg: string = ""
  link: boolean = false
  actionid : string = ""
  constructor(
    private signinService: SigninService,
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title
  ){
    this.titleService.setTitle("Sign In");
  }

  ngOnInit(): void {
    let local = this.localstorageservc.getStorageItems()
    if(local.id!=null&&local.id!=""&&local.token!=null){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard']);
      });
    }
   
  }  

  login(){
    
  
    console.log(this.loginForm.value)
    let username = this.loginForm.value.username
    if(username!=""&&this.loginForm.value.password!=""){
      this.signinService
      .postVerifyUsers(this.loginForm.value)
      .subscribe({
        
        next: (data) => {
          if(data?.token!=""){
            this.localstorageservc.saveStorageItems(data)
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['dashboard']);
            }); 
            //this.router.navigate(['profile']);

          } 
          else{
            this.failed = true
          }
        },
        error: (e) => {
          console.log(e)
          console.log(e.error)
          if(e.status==401)
            this.errorMsg = "Username or password doesn't match"
           else {
            this.errorMsg = e.error
          }
          
            this.failed = true

        }
        
      });
    }

  
  }
    
  openLink(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['message'],{ queryParams: {id: this.actionid}});
    });
  }

  register(){
    this.router.navigateByUrl('/registration', { skipLocationChange: true }).then(() => {
      this.router.navigate(['message']);
    });
  }
  
}
