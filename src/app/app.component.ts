import { Component , OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from '../app/services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import Swal from 'sweetalert2';
import { EmpAddEditeComponent } from '../app/emp-add-edite/emp-add-edite.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD';
  displayedColumns: string[] = ['id',
  'firstName',
  'lastName',
  'email',
  'dob',
  'gender',
  'company' ,
  'experience',
  'salary',
  'age',
  'mobile',
  'action'
];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _EmployeeService:EmployeeService, private _dialogRef:MatDialog, ){}
  ngOnInit(): void {
    this.getEmployeeList();
  }


  OpenAddEditEmpForm()
  {
    const dialogRef = this._dialogRef.open(EmpAddEditeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
    });
  }

    getEmployeeList()
    {
      this._EmployeeService.getEmployee().subscribe({
        next:(response) =>
        {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error:console.log,
      });
      }


      deleteEmployeeList(id : number)
      {
          this._EmployeeService.deleteEmployee(id).subscribe({
            next:(response) => {

              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
              this.getEmployeeList();
                },
            error:console.log,
          });
      }

      OpenEditEmpForm(data: any)
      {
      const dialogRef = this._dialogRef.open(EmpAddEditeComponent,{
            data,
        });
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if(val){
              this.getEmployeeList();
            }
          },
        });
      }


}
