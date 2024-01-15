import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environmentProd } from './../../../environments/environment.prod';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private urlfile : string ='';
  private urlPhoto : string ='';
  private urlfileget : string ='';
  private urlPhotoget : string ='';
  private common_base_house : string ='';
  private common_base_lcstation : string ='';
  private common_base_inventory : string ='';
  private common_base_jurisdiction : string ='';

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
  ) { 
    let temp = environment.production? environmentProd.apiUrl: environment.apiUrl
    this.urlfile = temp+"api/common/file/"
    this.urlPhoto = temp+"api/common/photo/"
    this.urlfileget = temp+"api/common/file/"
    this.urlPhoto = temp+"api/common/photo/"
    this.common_base_house = temp+"api/common/house/"
    this.common_base_lcstation = temp+"api/common/lcstation/"
    this.common_base_inventory = temp+"api/common/inventory/"
    this.common_base_jurisdiction = temp+"api/common/jurisdiction/"

  }

 // private common_base_house : string = 'http://localhost:8080/api/house/'
  //private common_base_lcstation : string = 'http://localhost:8080/api/lcstation/'
 // private common_base_inventory : string = 'http://localhost:8080/api/inventory/'
  //private common_base_jurisdiction : string = 'http://localhost:8080/api/jurisdiction/'
  //private urlfile : string ='http://localhost:8080/api/common/file';
 // private urlPhoto : string ='http://localhost:8080/api/common/photo';
 // private urlfileget : string ='http://localhost:8080/api/common/file/';
  //private urlPhotoget : string ='http://localhost:8080/api/common/photo/';


  httpReturner(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerCustom(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token) 
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }

  httpReturnerBlob(): any{
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=""&&obj.token!=null){
      var headers_object = new HttpHeaders({
        'Authorization': "Bearer "+ JSON.parse(obj.token), 
        'Content-Type': 'application/pdf',
      })
  
    }else{
      var headers_object = new HttpHeaders({
        'Authorization': ""
      })
    }
    return headers_object

  }
  
  uploadFile(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.urlfile,formData, httpOptions)
    
  }

  loadFile(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.urlfileget+filename, {headers, responseType: 'blob'})

  }

  uploadPhoto(file: File): Observable<any>{

    const httpOptions = {
      headers: this.httpReturnerCustom()
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.urlPhoto,formData, httpOptions)
    
  }

  loadPhoto(filename: String): Observable<any>{
    const httpOptions = {
      headers: this.httpReturnerBlob()
    };
    let headers = new HttpHeaders();
    let obj = this.localStorageServc.getStorageItems()
    if(obj.token!=null){
      //headers = headers.set('Accept', 'application/pdf');
      headers =headers.set( 'Authorization', "Bearer "+ JSON.parse(obj.token))
    }
  
    return this.http.get(this.urlPhotoget+filename, {headers, responseType: 'blob'})

  }

  addHouse(formData: any): Observable<any>{
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.post<any>(this.common_base_house+"addhouse",body,httpOptions)
  }

  getHouses(): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_house+"gethouses",httpOptions)
  }

  
  deleteHouse(id: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_house+"deletehouse/"+id,httpOptions)
  }


  
  addlcstation(formData: any): Observable<any>{
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.post<any>(this.common_base_lcstation+"addlcstation",body,httpOptions)
  }

  getlcstations(): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_lcstation+"getlcstations",httpOptions)
  }

  
  deletelcstation(id: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_lcstation+"deletelcstation/"+id,httpOptions)
  }

  addInventory(formData: any){
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.post<any>(this.common_base_inventory+"add",body,httpOptions)
  }

  updateInventory(formData: any){
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.post<any>(this.common_base_inventory+"update",body,httpOptions)
  }

  getAllInventory(): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_inventory+"list",httpOptions)
  }

  deleteInventory(id: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_inventory+"remove/"+id,httpOptions)
  }

  getInventory(id: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_inventory+"get/"+id,httpOptions)
  }

  addJurisdiction(formData: any): Observable<any>{
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.post<any>(this.common_base_jurisdiction+"add",body,httpOptions)
  }

  getJurisdictions(): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_jurisdiction+"get",httpOptions)
  }

  
  deleteJurisdiction(id: string): Observable<any>{

    const httpOptions = {
      headers: this.httpReturner()
    }
    return this.http.get<any>(this.common_base_jurisdiction+"delete/"+id,httpOptions)
  }


}
