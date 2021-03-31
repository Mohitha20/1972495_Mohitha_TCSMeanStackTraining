import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { task } from './task.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

//post method to insert
//post method takes 2 parameters
//1st parameter url, 2nd parameter JSON Data
storeTask(task:any){ //data is taken from employee component
  this.http.post("http://localhost:3000/employees",task).
  subscribe(result=>console.log(result),error=>console.log(error));
}
loadTask():Observable<task[]>{
  return this.http.get<task[]>("http://localhost:3000/employees");
}
}