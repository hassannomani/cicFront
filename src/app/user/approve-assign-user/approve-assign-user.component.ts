import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';


@Component({
  selector: 'app-approve-assign-user',
  templateUrl: './approve-assign-user.component.html',
  styleUrls: ['./approve-assign-user.component.css']
})
export class ApproveAssignUserComponent implements OnInit{

  designationForm = new FormGroup({
    'designation':  new FormControl('',[Validators.required]),
  })
  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Approve"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userApprove: any = {}
  email: any = ""
  designations: any = ['Director General', 'Director', 'Joint Director', 'Deputy Director','Assistant Director','Assistant Programmer','Revenue Officer','Assistant Revenue Officer', 'Tax Inspector']
  constructor(
    private userService: UserService,
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,


  ){
    this.titleService.setTitle("Approve User");
  }

  ngOnInit(): void {
    this
    .actroute
    .queryParams
    .subscribe(paramsg=>{
      this.email = paramsg['username']
    })
  }

  assign(){
    let des = this.designationForm.value["designation"]
    this.userService.assignAndApprove(this.email,des).subscribe({
      next: (data) => {
       if(data==true){
          this.message="Successfully Approved"
          this.openSnackBarWithRedirect()
        } else{
          this.message="Approval Failed! Please try again later!"
          this.openSnackBarWithRedirect()
        }
       },
       error: (e) => {
         console.log(e)
         this.message="Error occurred! Please try again later!"
         this.openSnackBarWithRedirect()
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

  openSnackBarWithRedirect(){
    this.openSnackBar()
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['approve-users']);
    });
  }

}
