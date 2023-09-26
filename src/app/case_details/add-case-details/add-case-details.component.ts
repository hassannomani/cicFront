import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators,  FormArray, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
export interface tin {
  tin : string,
  name: string
}

@Component({
  selector: 'app-add-case-details',
  templateUrl: './add-case-details.component.html',
  styleUrls: ['./add-case-details.component.css']
})
export class AddCaseDetailsComponent {

  addCaseDetails = new FormGroup({
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
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private actroute: ActivatedRoute,
    private fb: FormBuilder
  ){
    this.titleService.setTitle("Add Case Details");
  }

  caseDetailsSave(){
    console.log(this.addCaseDetails.value)
    let string= ""
    let tinnos: any
    tinnos=this.addCaseDetails.value['tinnos']
    for(let i=0;i<tinnos.length;i++)
    string+=tinnos[i].tin+","+tinnos[i].name+","
    
    this.addCaseDetails.value['tinno'] = string.substring(0,(string.length-1))
    console.log(this.addCaseDetails.value)    
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
}
