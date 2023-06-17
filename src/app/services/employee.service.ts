import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _HttpClient:HttpClient) { }
  addEmployee(data: any):Observable<any>
  {
      return this._HttpClient.post(`http://localhost:3000/employees`,data);
  }
  updateEmployee(id: number,data: any):Observable<any>
  {
      return this._HttpClient.put(`http://localhost:3000/employees/${id}`,data);
  }

  getEmployee():Observable<any>
  {
      return this._HttpClient.get(`http://localhost:3000/employees`);
  }
  deleteEmployee(id : number):Observable<any>
  {
      return this._HttpClient.delete(`http://localhost:3000/employees/${id}`);
  }
}
