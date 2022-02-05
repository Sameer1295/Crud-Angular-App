import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
    
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = "http://127.0.0.1:8000/api";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // errorHandler: (err: any, caught: Observable<Object>) => ObservableInput<any>;
   
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/employee')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(employee:Employee): Observable<any> {
    console.log('dsgvdv',employee);
    const formData: FormData = new FormData();
    const file: any = employee.fileSource;
    formData.append('fileSource', file,file.name);
    formData.append('name',employee.name);
    formData.append('email',employee.email);
    formData.append('number',employee.number);
    console.log('formdata',formData);
    return this.httpClient.post(this.apiURL + '/employee', formData)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/employee/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, formData: FormData): Observable<any> {
    // console.log('dsgvdv',employee);
    // console.log('filesource',employee.fileSource);
    // const formData2: FormData = new FormData();
    // const file: any = employee.fileSource;
    // console.log('file data',file);
    // formData2.append('fileSource', file,file.name);
    // formData2.append('name',employee.name);
    // formData2.append('email',employee.email);
    // formData2.append('number',employee.number);
    // // console.log('formdata',formData2);
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      })
    return this.httpClient.put(this.apiURL + '/employee/' + id,formData,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/employee/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
