import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService
  ) { }

  private common_base_house : string = 'http://localhost:8080/api/house/'
  private urlfile : string ='http://localhost:8080/api/common/file';
  private urlPhoto : string ='http://localhost:8080/api/common/photo';
  private urlfileget : string ='http://localhost:8080/api/common/file/';
  private urlPhotoget : string ='http://localhost:8080/api/common/photo/';
  private urletin : string ='http://localhost:8080/api/etin/tin/';


  // getDistrict(): Observable<any[]>{
   

  // }

  
  // getDivision(): Observable<any[]>{
    
  // }



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

}
