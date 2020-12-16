import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = [];

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.appService.getAllEmployees().subscribe((employeeData) => {
      console.log(employeeData);
      this.employees = employeeData.data;
    });
  }

}
