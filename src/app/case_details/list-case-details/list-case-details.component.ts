import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CaseDetailsService } from 'src/app/services/case-details-service/case-details.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/search-service/search.service';
@Component({
  selector: 'app-list-case-details',
  templateUrl: './list-case-details.component.html',
  styleUrls: ['./list-case-details.component.css']
})
export class ListCaseDetailsComponent implements OnInit{

  searchbox= new FormGroup({
    'taxpayername':  new FormControl(null,[]),
    'io':  new FormControl(null,[]),
    'tinno':  new FormControl(null,[Validators.pattern("^[0-9]*$")]),
    'bin':  new FormControl(null,[Validators.pattern("^[0-9]*$")])
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "View"
  buttonLabel2: string= "Add"
  buttonLabel3: string= "Delete"
  buttonLabel4: string= "Edit"
  buttonLabelSr: string= "Search"
  buttonLabelClr: string= "Clear"
  buttonLabelClrAll: string= "Clear All"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  caseDetails : any = []
  displayedColumns: any = []
  tempCaseDetailsList: any =[]
  activated: boolean = false
  criteria: string = ""
  searched: string = ""

  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private casedetailServ: CaseDetailsService,
    private searchServ: SearchService
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
          this.tempCaseDetailsList = this.caseDetails

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

  
  search(){
    let name = this.searchbox.value['taxpayername']
    let tin = this.searchbox.value['tinno']
    let bin = this.searchbox.value['bin']
    let io = this.searchbox.value['io']

    if(name!=null&&tin==null&&bin==null&&io==null){
      this.searchServ.case_name(name).subscribe({
        next: (data) => {
          this.successHandler(data,"Name",name)
        },
        error: (e) => {
          this.failureHandler(e);     
        }
      })

    }else if(name==null&&tin!=null&&bin==null&&io==null){

      this.searchServ.case_tin(tin).subscribe({
        next: (data) => {
          this.successHandler(data,"TIN", tin)
        },
        error: (e) => {
          this.failureHandler(e);     
        }
      })

    }else if(name==null&&tin==null&&bin!=null&&io==null){

      this.searchServ.case_bin(bin).subscribe({
        next: (data) => {
          this.successHandler(data, "BIN",bin)
        },
        error: (e) => {
          this.failureHandler(e);         
        }
      })
    }else if(name==null&&tin==null&&bin==null&&io!=null){

      this.searchServ.case_io(io).subscribe({
        next: (data) => {
          this.successHandler(data, "BIN",bin)
        },
        error: (e) => {
          this.failureHandler(e);         
        }
      })
    }
    else{
      this.message='Please choose one search field'
      this.openSnackBar()
    }


  }

  clear(){
    this.searchbox.reset()
  }

  successHandler(data: any, criteria: string, searched: any){
    this.activated = true
    this.criteria = criteria
    this.searched = searched
    if(data.length){
       this.caseDetails = data     
       // this.fileTrackList = data
       this.displayedColumns = [ 'Serial','taxpayername','action']
    }else{
      this.message = "No data Found"
      this.openSnackBar()
    }
  }
  failureHandler(err: any){
    this.message = "Error occurred!"
    this.openSnackBar() 
    console.log(err)
  }

  clearAll(){
    this.searchbox.reset()
    this.caseDetails = this.tempCaseDetailsList
    //this.tempFileTrackList.length = 0
    this.activated = false
  }

}
