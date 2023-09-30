import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { CaseDetailsService } from 'src/app/services/case-details-service/case-details.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-case-details',
  templateUrl: './view-case-details.component.html',
  styleUrls: ['./view-case-details.component.css']
})
export class ViewCaseDetailsComponent {

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Go back"
  buttonLabel2: string= "Add"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  caseDetails : any = {}
  tins: any =[]
  singleTin: Boolean = true
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private caseDetailsServ: CaseDetailsService
  ){
    this.titleService.setTitle("View Case Details");
  }
  ngOnInit(): void {
    this
    .actroute
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      if(id!=""){
        this.caseDetailsServ.getACaseDetails(id).subscribe({
          next: (data) => {
            if(data.taxcasedtlsuuid!=undefined){
              this.caseDetails = data
              let tintemp = data.tinno
              let tins = tintemp.split(",")

              if(tins.length==1){
                this.singleTin = true
              }else{
                for(let i=0;i<tins.length;i=i+2){
                  let obj = {name: tins[i], tinno: tins[i+1]}
                  this.tins.push(obj)
                } 
                this.singleTin = false            
              }
            }
            else{ 
              this.message = "Information not found!"
              this.openSnackBar()
            }
          },
          error: (e) => {
            this.message = "Error occurred! Please try again!"
            this.openSnackBar()
          }
        })
        
      }else{
        this.message = "No id found!"
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

  list(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['list-case-details'],);
    }); 
  }
}
