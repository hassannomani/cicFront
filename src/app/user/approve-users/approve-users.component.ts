import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';



@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.css']
})
export class ApproveUsersComponent implements OnInit{

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Approve"
  buttonLabel2: string= "Reject"
  buttonColor: string = "primary"
  buttonColor2: string = "danger"
  buttonType: string = "submit"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userList: any = []
  displayedColumns: any = []
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
    this.getAllPendingUser()
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  approve(username: any, index: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['approve-single'], { queryParams: {username:username}});
    });
  }

  reject(username: any, index: any){
    this.userService.rejectPendingUser(username).subscribe({
      next: (data) => {
        if(data==true){
          this.message="Successfully rejected"
          this.openSnackBar()
          this.getAllPendingUser()
        } else {
          this.message="Couldn't reject user. Please Try later"
          this.openSnackBar()
        }
      }
      ,
      error: (e) => {
        console.log(e)
        this.message = "Error occurred! Try again later!"
        this.openSnackBar()
      }
    })
  }

  getAllPendingUser(){
    this.userService.getAllPendingUsers().subscribe({
      next: (data) => {
        if(data.length>0){
          this.userList = data
          this.displayedColumns = [ 'username','firstName','lastName','mobile','action']
        } else {
          this.message = "No request found"
          this.openSnackBar()
        }
      }
      ,
      error: (e) => {
        this.message = "Error occurred! Try again later1!"
        this.openSnackBar()
      }
    })
  }

}
