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
export interface tin {
  name : string,
  date: string
}

@Component({
  selector: 'app-add-case-details',
  templateUrl: './add-case-details.component.html',
  styleUrls: ['./add-case-details.component.css']
})
export class AddCaseDetailsComponent implements OnInit{

  addCaseDetails = new FormGroup({
    'taxpayername':  new FormControl('',[Validators.required]),
    'tinno':  new FormControl('',[Validators.required]),
    'tinnos': this.fb.array([]),
    'tinmultiple':  new FormControl('',[Validators.required]),
    'nidno':  new FormControl('',[Validators.required]),
    'bin':  new FormControl('',[Validators.required]),
    'rjsc':  new FormControl('',[Validators.required]),
    'io':  new FormControl('',[Validators.required]),
    'ios': this.fb.array([]),
    'fileinitdate':  new FormControl('',[Validators.required]),
    'banksearchboolean':  new FormControl('',[Validators.required]),
    'banksearchdate':  new FormControl('',[Validators.required]),
    'bankfreezedate':  new FormControl('',[Validators.required]),
    'dateofreportsend':  new FormControl('',[Validators.required]),
    'dateofcompletion':  new FormControl('',[Validators.required]),
    'dateofsendback':  new FormControl('',[Validators.required]),
    'fileenlisted':  new FormControl('',[Validators.required]),
    'courtissue':  new FormControl('',[Validators.required]),
    'comment':  new FormControl('',[Validators.required]),
    'status':  new FormControl('',[Validators.required]),
    'cicamount':  new FormControl('',[Validators.required]),
    'fieldamount':  new FormControl('',[Validators.required]),
    'filetype':  new FormControl('',[Validators.required]),
    'bankunfreezedate':  new FormControl('',[Validators.required]),
    'createdby': new FormControl('',[Validators.required])
  })

  tinForm = new FormGroup({
    'tin': new FormControl('',[Validators.required]),
    'name': new FormControl('',[Validators.required])
   })

   
  ioForm = new FormGroup({
    'name': new FormControl('',[Validators.required]),
    'date': new FormControl('',[Validators.required]),
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
  defaultIo = {
    name: "",
    date: ""
  }
  localStore : any ={}
  createdBy: string = ""
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
    this.localStore = this.localstorageservc.getStorageItems()
    this.createdBy = JSON.parse(this.localStore.id)
  }

  caseDetailsSave(){

    let string= ""
    let tinnos: any
    tinnos=this.addCaseDetails.value['tinnos']
    for(let i=0;i<tinnos.length;i++)
    string+=tinnos[i].tin+","+tinnos[i].name+","
    if(string.length)
    this.addCaseDetails.value['tinno'] = this.addCaseDetails.value['tinno']+","+ string.substring(0,(string.length-1))
    this.addCaseDetails.value['status']='1'
    this.addCaseDetails.value['createdby']=this.createdBy
    
    let io: any
    let string2=""
    io= this.addCaseDetails.value['ios']
    for(let i=0;i<io.length;i++)
    string2+=io[i].name+","+io[i].date+","
    if(io.length)
    this.addCaseDetails.value['io'] = this.addCaseDetails.value['io']+","+ string2.substring(0,(string2.length-1))


    this.caseDetailsServ.addCaseDetails(this.addCaseDetails.value).subscribe({
      
      next: (data) => {
        //console.log(data)
        if(data?.taxcasedtlsuuid){
          this.message = "File Added successfully"
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

  // tinselection(value:any){
  //   console.log(value)
  //   this.dirty = true
  //   this.multitin = value=="1"||value==1?true:false
  // }

  get tinnos(){
    // return <FormArray>this.addEmployee.get('courses');
     return this.addCaseDetails.controls["tinnos"] as FormArray;
   }

   get ios(){
    // return <FormArray>this.addEmployee.get('courses');
     return this.addCaseDetails.controls["ios"] as FormArray;
   }

   addAnother(){
    let formGroup = this.createTins(this.defaultTin);
    this.tinnos.push(formGroup);
   
  }

  addAnotherio(){
    let formGroup = this.createIos(this.defaultIo);
    this.ios.push(formGroup);
   
  }

  createTins(tinnumber: any) {

    return this.fb.group({
        'tin' : [tinnumber.tin,[Validators.required]],
        'name' : [tinnumber.name,[Validators.required]]
    });
  }

  createIos(io: any) {

    return this.fb.group({
        'name' : [io.name,[Validators.required]],
        'date' : [io.date,[Validators.required]]
    });
  }

  deleteTin(lessonIndex: number) {
    this.tinnos.removeAt(lessonIndex);
  }

  deleteIo(lessonIndex: number) {
    this.ios.removeAt(lessonIndex);
  }

  bankSearch(value:any){
    this.showBanks = true
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
}
