import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  usersArr: any = []
  loaded: boolean = false
  noDatafound:boolean = false
  failed: boolean = false
  errorMsg: String = ""
  displayedColumns : any = []
  singleUser: any = {}
  buttonLabel: string = "View"
  buttonColor: string = "Basic"
  buttonType: string = "button"
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title
  ){
    this.titleService.setTitle("User List");

  }
  ngOnInit(): void {
    this.userService.getAllUSers().subscribe({
     
      next: (data) => {
        if(data.length){
          this.usersArr = data
          this.loaded  = true
          this.displayedColumns = [ 'username','firstName','lastName','roles','addedDate']

          console.log(this.usersArr)
        } 
        else{
          this.noDatafound = true
        }
      },
      error: (e) => {
        this.errorMsg = e
        this.failed = true
      }  
    });
  }



  // action(id: string, username: string){

  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['user-action'],{ queryParams: {username: username}});
  //   }); 
  // }

  // actionDetails(id: string, username: string){
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['action-history'],{ queryParams: {username: username}});
  //   }); 
  // }
}
