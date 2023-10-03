import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators,  FormArray, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import { CaseDetailsService } from 'src/app/services/case-details-service/case-details.service';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
export interface tin {
  tin : string,
  name: string
}

@Component({
  selector: 'app-edit-case-details',
  templateUrl: './edit-case-details.component.html',
  styleUrls: ['./edit-case-details.component.css']
})
export class EditCaseDetailsComponent implements OnInit{

  addCaseDetails = new FormGroup({
    'taxcasedtlsuuid':  new FormControl('',[Validators.required]),
    'taxpayername':  new FormControl('',[Validators.required]),
    'tinno':  new FormControl('',[Validators.required]),
    'tinnos': this.fb.array([]),
    'tinmultiple':  new FormControl('',[Validators.required]),
    'nidno':  new FormControl('',[Validators.required]),
    'bin':  new FormControl('',[Validators.required]),
    'rjsc':  new FormControl('',[Validators.required]),
    'io':  new FormControl('',[Validators.required]),
    'fileinitdate':  new FormControl('',[Validators.required]),
    'banksearchboolean':  new FormControl('',[Validators.required]),
    'banksearchdate':  new FormControl('',[Validators.required]),
    'bankfreezedata':  new FormControl('',[Validators.required]),
    'dateofreportsend':  new FormControl('',[Validators.required]),
    'dateofcompletion':  new FormControl('',[Validators.required]),
    'dateofsendback':  new FormControl('',[Validators.required]),
    'fileenlisted':  new FormControl('',[Validators.required]),
    'courtissue':  new FormControl('',[Validators.required]),
    'comment':  new FormControl('',[Validators.required]),
    'status':  new FormControl('',[Validators.required]),
    'createdby': new FormControl('',[Validators.required])
  })

  tinForm = new FormGroup({
    'tin': new FormControl('',[Validators.required]),
    'name': new FormControl('',[Validators.required])
   })
  
  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Add"
  buttonLabel2: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  multitin: boolean = false
  dirty: boolean = false
  showBanks: boolean = false
  defaultTin = {
    tin : "",
    name: ""
  }
  localStore : any ={}
  createdBy: string = ""
  caseDetails: any = {}
  singleTin: Boolean = false
  tins: any =[]
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private fb: FormBuilder,
    private caseDetailsServ: CaseDetailsService
  ){
    this.titleService.setTitle("Add Case Details");
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
            
              this.loadCaseDetails()
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

  caseDetailsSave(){
    
    this.caseDetailsServ.updateCaseDetails(this.addCaseDetails.value).subscribe({
      
      next: (data) => {
        //console.log(data)
        if(data?.taxcasedtlsuuid){
          this.message = "File updated successfully"
          this.addCaseDetails.reset()
          this.openSnackBar()
        }
        else{
          this.message= "Failed to save file"
          this.openSnackBar()
        }
      },
      error: (e) => {
       this.message = "Error ocurred!"
       this.openSnackBar()
      }

    })
  }


  tinselection(value:any){
    console.log(value)
    this.dirty = true
    this.multitin = value=="1"||value==1?true:false
  }

  get tinnos(){
    // return <FormArray>this.addEmployee.get('courses');
     return this.addCaseDetails.controls["tinnos"] as FormArray;
   }

  addAnother(){
    let formGroup = this.createTins(this.defaultTin);
    this.tinnos.push(formGroup);
   
  }

  createTins(tinnumber: any) {

    return this.fb.group({
        'tin' : [tinnumber.tin,[Validators.required]],
        'name' : [tinnumber.name,[Validators.required]]
    });
  }

  deleteTin(lessonIndex: number) {
    this.tinnos.removeAt(lessonIndex);
  }

  bankSearch(value:any){
    this.showBanks = true
  }

  loadCaseDetails(){
    this.addCaseDetails.get('taxcasedtlsuuid')?.setValue(this.caseDetails.taxcasedtlsuuid)
    this.addCaseDetails.get('taxpayername')?.setValue(this.caseDetails.taxpayername)
    if(this.singleTin==true)
      this.addCaseDetails.get('tinmultiple')?.setValue("0")
    else
    this.addCaseDetails.get('tinmultiple')?.setValue("1")
    this.dirty=true

    this.addCaseDetails.get('tinno')?.setValue(this.caseDetails.tinno)

    //this.addCaseDetails.get('tinno')?.setValue(this.caseDetails.tinno)
    this.addCaseDetails.get('bin')?.setValue(this.caseDetails.bin)
    this.addCaseDetails.get('rjsc')?.setValue(this.caseDetails.rjsc)
    this.addCaseDetails.get('nidno')?.setValue(this.caseDetails.nidno)
    this.addCaseDetails.get('io')?.setValue(this.caseDetails.io)
    this.addCaseDetails.get('fileinitdate')?.setValue(this.caseDetails.fileinitdate)
    this.addCaseDetails.get('banksearchboolean')?.setValue(this.caseDetails.banksearchboolean)
    this.addCaseDetails.get('banksearchdate')?.setValue(this.caseDetails.banksearchdate)
    this.addCaseDetails.get('bankfreezedata')?.setValue(this.caseDetails.bankfreezedata)
    this.addCaseDetails.get('dateofreportsend')?.setValue(this.caseDetails.dateofreportsend)
    this.addCaseDetails.get('dateofcompletion')?.setValue(this.caseDetails.dateofcompletion)
    this.addCaseDetails.get('dateofsendback')?.setValue(this.caseDetails.dateofsendback)
    this.addCaseDetails.get('fileenlisted')?.setValue(this.caseDetails.fileenlisted)
    this.addCaseDetails.get('courtissue')?.setValue(this.caseDetails.courtissue)
    this.addCaseDetails.get('comment')?.setValue(this.caseDetails.comment)
  }

}


