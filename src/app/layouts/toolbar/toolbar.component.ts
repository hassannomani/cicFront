import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SigninService } from 'src/app/services/signin-service/signin.service';
import {MatBadgeModule} from '@angular/material/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],

})
export class ToolbarComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false
  isViewer: boolean = false
  isUser: boolean = false;
  isRepresentative: boolean = false;
  unread: number = 0
  designation: string = ""
  username: string = ""
  constructor(
    
    private localStorage: LocalStorageService,
    private signInService: SigninService,
    private router: Router, 
  ){}
  ngOnInit(): void {
    this.signInService.loginStatusChange().subscribe(loggedIn => {
      let local = this.localStorage.getStorageItems();
      console.log(local)
      if(local.token==""||local.token==null){
        this.isLoggedIn = false;
        this.designation=""
        this.username=""
      }
      else{

        this.isLoggedIn = true;
        let designation = local.designation!=null?JSON.parse(local.designation):null;

        this.designation = designation
        this.username  = local.username?JSON.parse(local.username): ""
       

        if(designation=="Assistant Programmer")
          this.isAdmin = true
        else{
          this.isUser = true
          this.isAdmin = false
        }
          
        // else if(role=="ROLE_REPRESENTATIVE"){
        //   this.isRepresentative = true
        //   this.isAdmin = false
        //   this.isAgent = false
        //   this.isViewer = false
        // }
          
        // else if(role=="ROLE_VIEWER"){
        //   this.isViewer = true
        //   this.isRepresentative = false
        //   this.isAdmin = false
        //   this.isAgent = false
        // }
      
          console.log(this.isAdmin)
          console.log(this.isUser)
          console.log(this.isRepresentative)
          console.log(this.isViewer)
      }
      
    })
   
  }

  heightReturner(){
    if(this.isLoggedIn)
      return "89vh";
    else
      return "";
  }

}
