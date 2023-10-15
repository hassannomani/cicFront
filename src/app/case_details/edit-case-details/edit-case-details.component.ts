import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators,  FormArray, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import { CaseDetailsService } from 'src/app/services/case-details-service/case-details.service';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';

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
    'taxcasedtlsuuid':  new FormControl(''),
    'taxpayername':  new FormControl(''),
    'tinno':  new FormControl('',[Validators.required]),
    'fileno':  new FormControl(''),
    'tinnos': this.fb.array([]),
    'tinmultiple':  new FormControl(''),
    'nidno':  new FormControl(''),
    'bin':  new FormControl(''),
    'rjsc':  new FormControl(''),
    'io':  new FormControl(''),
    'fileinitdate':  new FormControl(''),
    'banksearchboolean':  new FormControl(''),
    'banksearchdate':  new FormControl(''),
    'bankfreezedata':  new FormControl(''),
    'dateofreportsend':  new FormControl(''),
    'dateofcompletion':  new FormControl(''),
    'dateofsendback':  new FormControl(''),
    'fileenlisted':  new FormControl(''),
    'courtissue':  new FormControl(''),
    'comment':  new FormControl(''),
    'status':  new FormControl(''),
    'createdby': new FormControl(''),
    'cicamount':  new FormControl(''),
    'fieldamount':  new FormControl(''),
    'filetype':  new FormControl(''),
    'bankunfreezedate':  new FormControl(''),
    'dateofsendbacktofield':  new FormControl(''),
    'courtissueremarks':  new FormControl(''),
    'otherinvestigation': new FormControl('')


  })

  tinForm = new FormGroup({
    'tin': new FormControl('',[Validators.required]),
    'name': new FormControl('',[Validators.required])
   })
  
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  
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
  id: string = ""
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
        this.id = id
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
          //this.addCaseDetails.reset()
          this.openSnackBar()
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['edit-case-detail'],{ queryParams: {id: this.id}});
          }); 
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
    
    this.addCaseDetails.get('tinno')?.setValue(this.caseDetails.tinno)
    this.addCaseDetails.get('fileno')?.setValue(this.caseDetails.fileno)

    //this.addCaseDetails.get('tinno')?.setValue(this.caseDetails.tinno)
    this.addCaseDetails.get('bin')?.setValue(this.caseDetails.bin)
    this.addCaseDetails.get('rjsc')?.setValue(this.caseDetails.rjsc)
    this.addCaseDetails.get('nidno')?.setValue(this.caseDetails.nidno)
    this.addCaseDetails.get('io')?.setValue(this.caseDetails.io)
    this.addCaseDetails.get('fileinitdate')?.setValue(this.caseDetails.fileinitdate)
    this.addCaseDetails.get('banksearchdate')?.setValue(this.caseDetails.banksearchdate)
    this.addCaseDetails.get('bankfreezedata')?.setValue(this.caseDetails.bankfreezedata)
    this.addCaseDetails.get('bankunfreezedate')?.setValue(this.caseDetails.bankunfreezedate)
    this.addCaseDetails.get('dateofreportsend')?.setValue(this.caseDetails.dateofreportsend)
    this.addCaseDetails.get('dateofcompletion')?.setValue(this.caseDetails.dateofcompletion)
    this.addCaseDetails.get('dateofsendbacktofield')?.setValue(this.caseDetails.dateofsendbacktofield)
    this.addCaseDetails.get('dateofsendback')?.setValue(this.caseDetails.dateofsendback)
    this.addCaseDetails.get('fileenlisted')?.setValue(this.caseDetails.fileenlisted)
    this.addCaseDetails.get('courtissue')?.setValue(this.caseDetails.courtissue)
    this.addCaseDetails.get('comment')?.setValue(this.caseDetails.comment)
    this.addCaseDetails.get('courtissueremarks')?.setValue(this.caseDetails.courtissueremarks)
    this.addCaseDetails.get('otherinvestigation')?.setValue(this.caseDetails.otherinvestigation)
    this.addCaseDetails.get('filetype')?.setValue(this.caseDetails.filetype)
    this.addCaseDetails.get('cicamount')?.setValue(this.caseDetails.cicamount)
    this.addCaseDetails.get('fieldamount')?.setValue(this.caseDetails.fieldamount)
  }

}


