import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CaseDetailsService } from 'src/app/services/case-details-service/case-details.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-case-details',
  templateUrl: './list-case-details.component.html',
  styleUrls: ['./list-case-details.component.css']
})
export class ListCaseDetailsComponent implements OnInit{

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "View"
  buttonLabel2: string= "Add"
  buttonLabel3: string= "Delete"
  buttonLabel4: string= "Edit"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  caseDetails : any = []
  displayedColumns: any = []
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private casedetailServ: CaseDetailsService,
  ){
    this.titleService.setTitle("List of Case Details");
  }

  ngOnInit(): void {
    this.loadAllFile()
  }

  loadAllFile(){
    this.casedetailServ.listCaseDetails().subscribe({
      next: (data) => {
        if(data.length){
          this.caseDetails = data
          this.displayedColumns = [ 'Serial','taxpayername','action']
        }else{
          this.message = "No data Found"
          this.openSnackBar()
        }
        
      },
      error: (e) => {
       
        this.message = "Error occurred!"
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

  viewCaseDetails(id: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['view-case-detail'],{ queryParams: {id: id}});
    }); 
  }

  editCaseDetails(id: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['edit-case-detail'],{ queryParams: {id: id}});
    }); 
  }

  
  delete(id: any){
    this.casedetailServ.deleteACaseDetail(id).subscribe({
      next: (data) => {
        if(data==true){
          this.message = "File Deteled"
          this.openSnackBar()
          this.loadAllFile()
        }else{
          this.message = "No data Found"
          this.openSnackBar()
        }
        
      },
      error: (e) => {
       
        this.message = "Error occurred!"
        this.openSnackBar()      
      } 
    })
  }


}
