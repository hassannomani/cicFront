import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormArray, FormBuilder, } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { formatDate } from '@angular/common' 
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
export interface course {
  title : string,
  country : string,
  startDate : string,
  endDate : string,
  fundedBy : string,
}
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{


  addEmployee = new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'rank' : new FormControl('',[Validators.required]),
    'dob' : new FormControl('',[Validators.required]),
    'dateJoining' : new FormControl('',[Validators.required]),
    'education' : this.fb.array([]),
    'division' : new FormControl('',[Validators.required]),
    'homeDistrict': new FormControl('',[Validators.required]),
    'batch': new FormControl('',[Validators.required]),
    'photo': new FormControl('',[Validators.required]),
    'courses': this.fb.array([]),
    'courseCount': new FormControl('',[Validators.required]),
    'cadreNo': new FormControl('',[Validators.required])
  })

  coursesForm = new FormGroup({
    'title' : new FormControl('',[Validators.required]),
    'country' : new FormControl('',[Validators.required]),
    'category' : new FormControl('',[Validators.required]),
    'startDate' : new FormControl('',[Validators.required]),
    'endDate' : new FormControl('',[Validators.required]),
    'fundedBy' : new FormControl('',[Validators.required]),
  })

  educationForm = new FormGroup({
    'degree' : new FormControl('',[Validators.required]),
    'subject' : new FormControl('',[Validators.required]),
    'year' : new FormControl('',[Validators.required]),
    'institute' : new FormControl('',[Validators.required]),
  })
  addedSuccess: boolean = false
  addedSuccess2: boolean = false
  addedSuccess3: boolean = false
  failedCreation: boolean = false
  disabledtrue: boolean = false
  userId: boolean = false
  localStore: any = {}
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  bankfailed: boolean = false
  addressfailed: boolean = false
  fileUploaded: boolean = false
  photoUploaded: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string= "Go nexts"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  buttonLabel2: string= "Add Course"
  buttonColor2: string = "primary"
  buttonType2: string = "button"
  buttonLabel3: string= "Upload"
  buttonColor3: string = "primary"
  buttonType3: string = "button"
  buttonLabel4: string= "Upload"
  buttonColor4: string = "primary"
  buttonType4: string = "button"
  division: any[] = []
  district: any[] = []
  districtSecondary: any[] = []
  country: any[] = []
  index: any = 0
  roles: any = []
  saving: boolean = false
  savingMsg: string = ""
  courseArray: course[] = []
  step1Success : boolean = false
  step2Success : boolean = false
  tinnotFound : boolean = false
  photo!: File;
  file_list: Array<string> = [];
  modalTitle: string = ""
  modalMessage: string= ""
  tempDist: string = ""
  defaultCourse = {
    title : "",
    country : "",
    startDate : "",
    endDate : "",
    fundedBy : "",
    category: ""
  }

  defaultEducation = {
    degree : "",
    subject : "",
    year : "",
    institute : "",
  }

  category : any =[
    "Customs",
    "VAT",
    "IT",
    "Others"
  ]
  coursesAttended : any = []
  constructor(
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private titleService:Title,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private employeeServ: EmployeeService
  ){
    this.titleService.setTitle
    
    ("Add Employee");

  }
  ngOnInit(): void {
    // this.localStore = this.localStorage.getStorageItems();
    // if(this.localStore.token==""){
    //   this.router.navigate(['/logout']);
    // }
    // this.onTabChanged();
    //   forkJoin(
    //     [this.commonService.getDistrict(),
    //     this.commonService.getDivision(),
    //     this.commonService.getCountry(),
    //     this.userService.getRoles(),
       
    //   ])
    //   .subscribe({
    //     next: (data) => {
    //       //console.log(data)
    //       this.districtSecondary = data[0];
    //       this.division = data[1];
    //       this.country = data[2];
    //       this.userId = JSON.parse(this.localStore.username);
    //     },
    //     error: (e) => {
         
    //         console.log("Error retrieving")
    //     }
    //   });
  }

  EmployeeSave(){


    console.log(this.addEmployee.value)
    // let tempCategory = ""
    // for(let i=0;i<this.courses.length;i++){
    //   for(let j=0;j<this.courses[i].category.length;j++)
    // }
    // var temp = this.addEmployee.value["courses"]
    // console.log(temp)
    // if(temp?.length)
    // {
    //   let tempCategory = ""
    //   for(let i=0;i<temp.length;i++){
    //   let course = temp[i]['category']
    //     if(course?.category){
    //       for(let j=0;j<course['category'].length;j++)
    //       {}
    //     }
        
    //   }
    // }
    // return
    this.addEmployee.get("homeDistrict")?.setValue(this.tempDist)
    let ccount = this.educations.length
    this.addEmployee.get("courseCount")?.setValue(ccount.toString())

    this.employeeServ
    .addUser(this.addEmployee.value)
    .subscribe({
    
      next: (data) => {

        if(data.employeeId==undefined){
          this.modalMessage = "Employee information saving failed"
          this.modalTitle = "Failed!"
          this.alertDialog()

        } else{
          this.modalMessage = "Employee information successfully saved"
          this.modalTitle = "Success!"
          this.alertDialog()
          
        }
      },
      error: (e) => {
        this.bankfailed = true
        this.saving = false
      }
      
    });
}

  selectedTabChange($event:any) {
    this.index = $event.index
    console.log(this.index)
    this.onTabChanged()
  }

  saveCourses(){
    // let prdistrict:any={}
    // prdistrict=this.addRepresentative.value['prdistrict']
    // let bdistrict:any={}
    // bdistrict=this.addRepresentative.value['bdistrict']
    // let pmdistrict:any={}
    // pmdistrict=this.addRepresentative.value['pmdistrict']
    // let presentobj={
    //   type: "PRESENT",
    //   division: this.addRepresentative.value['prdivision'],
    //   district: prdistrict.name,
    //   thana: this.addRepresentative.value['prthana'],
    //   house: this.addRepresentative.value['prhouse'],
    //   road: this.addRepresentative.value['prroad'],
    //   block: this.addRepresentative.value['prblock'],
    //   ward: this.addRepresentative.value['prward'],
    //   flat: this.addRepresentative.value['prflat'],
    //   villageUnion: this.addRepresentative.value['prvillageUnion'],
    //   citycorporation: this.addRepresentative.value['prcitycorporation'],
    //   others: this.addRepresentative.value['prothers'],
    //   addedBy: "AGENT" 
    
    
  //this.agentService.addAddress
    // forkJoin([
    //   this.commonService.addAddress(presentobj),
    //   this.commonService.addAddress(businessobj),
    //   this.commonService.addAddress(permanentobj)
    // ])
    // .subscribe({
    //   next: (data) => {
    //     //console.log(data)
        
    //     if(data?.length<3)
    //       this.addressfailed = true
    //     else{
    //       this.addressArr.push(presentobj)
    //       this.addressArr.push(businessobj)
    //       this.addressArr.push(permanentobj)
    //       this.index+=1;
    //       this.step2Success = true
    //     }
    //   },
    //   error: (e) => {
        
    //       console.log("Error retrieving")
    //       this.addressfailed = true
    //   }
    // });
  }

 
  
  onTabChanged() {
    console.log(this.index)
    if(this.index==1){
      //this.registerUser()
    }
    else if (this.index==2) {
      //this.saveBankDetails()
    } else if (this.index==3) {
      //his.saveAddresses()
    }
  }
  step1(){
    this.step1Success = true
    this.index+=1;
  }
  step2(){
    this.step2Success = true
    this.index+=1;
  }
  

  divisionChange(value:any){
    console.log(value)
    this.district = []
    for(let i=0;i<this.districtSecondary.length;i++){
      if(this.districtSecondary[i].divisionId==value)
      this.district.push(this.districtSecondary[i])
    }
    
  }

  categorySelected(value: any){
    console.log(value.join())
  }


  selectPhoto(event: any){
    this.photo = event.target.files.item(0);
  }

  uploadPhoto() {
    this.commonService.uploadPhoto(this.photo).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addEmployee.get('photo')?.setValue(data.fileUri);
          console.log(this.addEmployee)
          this.photoUploaded = true
        }
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  
  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

  createCourse(course: any) {

    return this.fb.group({
        'title' : [course.title,[Validators.required]],
        'country' : [course.country,[Validators.required]],
        'category' : [course.category,[Validators.required]],
        'startDate' : [course.startDate,[Validators.required]],
        'endDate' : [course.endDate,[Validators.required]],
        'fundedBy' : [course.fundedBy,[Validators.required]],
    });
  }

  addAnother(){
    //this.courses.push(this.coursesForm);
    let formGroup = this.createCourse(this.defaultCourse);
    this.courses.push(formGroup);
   
  }

  get courses(){
   // return <FormArray>this.addEmployee.get('courses');
    return this.addEmployee.controls["courses"] as FormArray;
  }

  get educations(){
    // return <FormArray>this.addEmployee.get('courses');
     return this.addEmployee.controls["education"] as FormArray;
   }

  deleteLesson(lessonIndex: number) {
    this.courses.removeAt(lessonIndex);
  }

  districtChange(value:any){
    console.log(value)
    this.tempDist = value.name

  }

  createEducation(course: any) {

    return this.fb.group({
      'degree' : new FormControl('',[Validators.required]),
      'subject' : new FormControl('',[Validators.required]),
      'year' : new FormControl('',[Validators.required]),
      'institute' : new FormControl('',[Validators.required]),
    });
  }

  addAnotherEducation(){
    //this.courses.push(this.coursesForm);
    let formGroup = this.createEducation(this.defaultCourse);
    this.educations.push(formGroup);
   
  }


}

