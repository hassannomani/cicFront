import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FileTrackService } from 'src/app/services/file-track-service/file-track.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit{

  addInventory = new FormGroup({
    'inventoriid': new FormControl('',[Validators.required]),
    'name':  new FormControl('',[Validators.required]),
    'quantity':  new FormControl('',[Validators.required]),
    'picture':  new FormControl('',[Validators.required]),
    'file': new FormControl(File,[Validators.required])
  })


  message : string = ""
  failed: boolean = false
  buttonLabel: string= "Upload"
  buttonLabel2: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  inventorylist : any = []
  displayedColumns: any = []
  image: any = ""
  inventory: any ={}
  photoUploaded: boolean = false

  photo!: File;
  @ViewChild('fileInput', { static: true }) fileInput?: ElementRef;

  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private fileTrackServ: FileTrackService,
    private commonServ: CommonService,
    private sanitizer: DomSanitizer,
    private actroute: ActivatedRoute,
  ){
    this.titleService.setTitle("View Inventory");
  }

  ngOnInit(): void {
    this
    .actroute
    .queryParams
    .subscribe(paramsg=>{
      let id = paramsg['id']
      if(id!=""){
        this.commonServ.getInventory(id).subscribe({
          next: (data) => {
            if(data.inventoriid==undefined||data.inventoriid==null){
              this.message="No inventory"
              this.openSnackBar()
            }else{
              this.inventory = data
              this.loadFields()
              this.loadPhoto(data.picture)
            }
          },
          error: (e) => {
            this.message = "Error occurred"
            this.openSnackBar()
          }
        })
      }
    })
  }

  loadFields(){
    this.addInventory.get('inventoriid')?.setValue(this.inventory.inventoriid)
    this.addInventory.get('name')?.setValue(this.inventory.name)
    this.addInventory.get('quantity')?.setValue(this.inventory.quantity)
    this.addInventory.get('picture')?.setValue(this.inventory.picture)
  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  loadPhoto(url: string){
    let temp = url.split("\\")
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonServ.loadPhoto(temp[temp.length-1]).subscribe({
        next: (data) => {
      
          let temp = data
          let objectURL = URL.createObjectURL(temp)
          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL)
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    } 
    else alert("file not found")
  }

  saveInventory(){
    this.commonServ.updateInventory(this.addInventory.value).subscribe({
      next: (data) => {
        if(data.inventoriid){
          this.message = "Successfully added"
          if(this.fileInput)
            this.fileInput.nativeElement.value = ""
          this.addInventory.reset()
          this.photoUploaded = false
          this.openSnackBar()
        }
      },
      error: (e) => {
        this.message = "Error occurred"
        this.openSnackBar()
      }
    })
  }

  selectFile(event: any){
    this.photo = event.target.files.item(0);
  }

  uploadPhoto() {
    this.commonServ.uploadPhoto(this.photo).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addInventory.get('picture')?.setValue(data.fileUri);
          this.photoUploaded = true
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }


}
