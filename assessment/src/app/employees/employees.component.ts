import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any;
  showLoading = false;
  constructor(public appService: AppService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.showLoading = true;
    this.appService.getAllEmployees().subscribe((employeeData) => {
      setTimeout(() => {
        this.showLoading = false;
      }, 1000);
      this.employees = employeeData.data;
    },
      (err) => {
        this.showLoading = false;
        console.log('error ocuur while fetching employee', err);
      }
    );
  }

  deleteEmployee(employee: any): void {
    this.showLoading = true;
    this.appService.deleteEmployee(employee.id).subscribe((employeeData) => {
      this.getAllEmployees();
      this.snackBar.open(employeeData.message, 'Success', {
        duration: 2000,
      });
    },
      (err) => {
        this.showLoading = false;
        console.log('error ocuur deleting employee', err);
      });
  }

  editEmployee(employee: any): void { }

  viewEmployee(employee: any): void {
    this.router.navigateByUrl('/employee/' + employee.id);
  }

}
