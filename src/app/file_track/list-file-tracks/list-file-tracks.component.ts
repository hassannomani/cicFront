import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FileTrackService } from 'src/app/services/file-track-service/file-track.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/search-service/search.service';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common-service/common.service';

@Component({
  selector: 'app-list-file-tracks',
  templateUrl: './list-file-tracks.component.html',
  styleUrls: ['./list-file-tracks.component.css']
})
export class ListFileTracksComponent implements OnInit{

  searchbox= new FormGroup({
    'taxpayername':  new FormControl(null,[Validators.required]),
    'tinno':  new FormControl(null,[Validators.pattern("^[0-9]*$")]),
    'bin':  new FormControl(null,[Validators.pattern("^[0-9]*$")]),
    'lcstations':  new FormControl(null,[]),
    'customshouse':  new FormControl(null,[]),
  })

  message : string = ""
  failed: boolean = false
  buttonLabel: string= "View"
  buttonLabel2: string= "Add"
  buttonLabel3: string= "Delete"
  buttonLabel4: string= "Edit"
  buttonColor: string = "primary"
  buttonColor2: string = "warn"
  buttonLabelSr: string= "Search"
  buttonLabelClr: string= "Clear"
  buttonLabelClrAll: string= "Clear All"
  buttonType: string = "button"
  errorMsg: string = ""
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fileTrackList : any = []
  displayedColumns: any = []
  tempFileTrackList: any =[]
  houses: any = []
  lcstations: any =[]
  activated: boolean = false
  criteria: string = ""
  searched: string = ""
  constructor(
    private router: Router,
    private localstorageservc: LocalStorageService,
    private titleService:Title,
    private _snackBar: MatSnackBar,
    private fileTrackServ: FileTrackService,
    private searchServ: SearchService,
    private commonServ: CommonService
  ){
    this.titleService.setTitle("Add to File Track");
  }

  ngOnInit(): void {
    this.loadAllFile()
    this.loadHouseAndStations()
  }

  loadAllFile(){
    this.fileTrackServ.listFileTracks().subscribe({
      next: (data) => {
        if(data.length){
          this.fileTrackList = data
          this.tempFileTrackList = this.fileTrackList

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


  loadHouseAndStations(){
    forkJoin([
      this.commonServ.getHouses(),
      this.commonServ.getlcstations()
    ])
    .subscribe({
      next: (data) => {
        //console.log(data)
        this.houses = data[0];
        this.lcstations = data[1];
      },
      error: (e) => {
       
          console.log("Error retrieving")
      }
    });
  }

  
  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }

  viewFileTrack(id: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['view-file-track'],{ queryParams: {id: id}});
    }); 
  }

  edit(id:any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['edit-file-track'],{ queryParams: {id: id}});
    }); 
  }

  
  delete(id: any){
    this.fileTrackServ.deleteAFileTrack(id).subscribe({
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
    let house = this.searchbox.value['customshouse']
    let lc = this.searchbox.value['lcstations']
    if(name!=null&&tin==null&&bin==null&&house==null&&lc==null){
      this.searchServ.track_name(name).subscribe({
        next: (data) => {
          this.successHandler(data,"Name",name)
        },
        error: (e) => {
          this.failureHandler(e);     
        }
      })

    }else if(name==null&&tin!=null&&bin==null&&house==null&&lc==null){

      this.searchServ.track_tin(tin).subscribe({
        next: (data) => {
          this.successHandler(data,"TIN", tin)
        },
        error: (e) => {
          this.failureHandler(e);     
        }
      })

    }else if(name==null&&tin==null&&bin!=null&&house==null&&lc==null){

      this.searchServ.track_bin(bin).subscribe({
        next: (data) => {
          this.successHandler(data, "BIN",bin)
        },
        error: (e) => {
          this.failureHandler(e);         
        }
      })

    }else if(name==null&&tin==null&&bin==null&&house!=null&&lc==null){

      this.searchServ.track_house(house).subscribe({
        next: (data) => {
          this.successHandler(data, "Customs House", house)
        },
        error: (e) => {
          this.failureHandler(e);             
        }
      })

    }
    else if(name==null&&tin==null&&bin==null&&house==null&&lc!=null){

      this.searchServ.track_lc(lc).subscribe({
        next: (data) => {
          this.successHandler(data, "LC Station", lc)
        },
        error: (e) => {
          this.failureHandler(e);          
        }
      })

    }
    
    else{
      console.log(name)
      console.log(tin)
      console.log(bin)
      console.log(house)
      console.log(lc)
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
       this.fileTrackList = data     
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
    console.log(this.tempFileTrackList)
    this.fileTrackList = this.tempFileTrackList
    //this.tempFileTrackList.length = 0
    this.activated = false
  }


}
