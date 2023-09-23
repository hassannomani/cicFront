import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common-service/common.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private localStorageServc: LocalStorageService,
    private commonService: CommonService

  ) { }
  private base : string ='http://localhost:8080/api/employees';
  private add_url = this.base
  private getall_url = this.base
  private findname = this.base+"/searchname/"
  private findbatch = this.base+"/searchbatch/"
  private findcname = this.base+"/searchcname/"
  private findccountry = this.base+"/searchccountry/"
  private findccfund = this.base+"/searchcfund/"
  private findsubject = this.base+"/searchsubject/"
  private findccount = this.base+"/searchccount/"
  private findccategory = this.base+"/searchccategory/"
  private findcyear = this.base+"/searchcyear/"

  
  addUser(formData: any): Observable<any>{
    const body=JSON.stringify(formData);

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.post<any>(this.add_url,body,httpOptions)
  }

  listEmployees(): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.getall_url,httpOptions)
  }

  singleEmployee(id: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.base+"/"+id,httpOptions)
  }

  findName(name: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any[]>(this.findname+name,httpOptions)
  }
  findBatch(batch: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findbatch+batch,httpOptions)
  }
  findCourse(coursename: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findcname+coursename,httpOptions)
  }

  findCourseCountry(countryname: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccountry+countryname,httpOptions)
  
  }
  findCourseFund(fund: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccfund+fund,httpOptions)
  }

  findSubject(subject: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findsubject+subject,httpOptions)
  }

  findCourseCount(count: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccount+count,httpOptions)
  }

  findCourseCategory(cat: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findccategory+cat,httpOptions)
  }

  findCourseYear(year: string): Observable<any>{

    const httpOptions = {
      headers: this.commonService.httpReturner()
    }
    return this.http.get<any>(this.findcyear+year,httpOptions)
  }
}
