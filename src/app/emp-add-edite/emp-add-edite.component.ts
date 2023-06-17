import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-add-edite',
  templateUrl: './emp-add-edite.component.html',
  styleUrls: ['./emp-add-edite.component.scss']
})
export class EmpAddEditeComponent implements OnInit{

  empForm: FormGroup;
  experience: string[] = [
    'Entry-level',
    'Intermediate',
    'Mid-level',
    'Senior ',
  ];


  constructor(private _fb:FormBuilder , private _EmployeeService:EmployeeService ,
    private _dialogRef :MatDialogRef<EmpAddEditeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.empForm = this._fb.group({
        firstName:'',
        lastName:'',
        email:'',
        dob:'',
        gender:'',
        company:'',
        experience:'',
        salary:'',
        mobile:'',
        age:'',
      });

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
   }

  OnsubmiteForm()
  {
    if(this.empForm.valid)
    {
      if(this.data)
      {
        this._EmployeeService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val : any) =>
          {
             Swal.fire("Good job!",  "Employee Updated!", "success");
              this._dialogRef.close(true);
              
          },
         error:(err:any) =>{
          console.error(err);
         },
        });

      }else{
        this._EmployeeService.addEmployee(this.empForm.value).subscribe({
          next:(val : any) =>
          {
             Swal.fire("Good job!",  "Employee Added Successfully", "success");
              this._dialogRef.close(true);
          },
         error:(err:any) =>{
          console.error(err);
         },
        });
      }

     // console.log(this.empForm.value);

    }

  }

}
