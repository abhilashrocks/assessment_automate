import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id = '';
  employeeData: any;
  showLoading = false;
  constructor(public appService: AppService, public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });
    this.getEmployeeDetailsById();
  }

  getEmployeeDetailsById(): void {
    this.showLoading = true;
    this.appService.getEmployeeById(this.id).subscribe((employeeData) => {
      this.employeeData = employeeData.data;
      setTimeout(() => {
        this.showLoading = false;
      }, 1000);
    }, (err) => {
      this.showLoading = false;
      console.log('error ocuur while fetching employee by id', err);
    });
  }

  back(): void {
    this.router.navigateByUrl('/employees');
  }


}
