import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any;
  showLoading = false;
  show = false;
  message = '';
  isAdd = 'Add';
  submitted = false;
  age = 0;
  name = '';
  salary = 0;
  employeeForm: FormGroup ;

  constructor(public appService: AppService, private snackBar: MatSnackBar,
    private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) {
      this.employeeForm = this.formBuilder.group({
        id: [],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }

  ngOnInit(): void {
    this.getAllEmployees();

  }

  buildForm(): void {
    this.employeeForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
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
      const index = this.employees.findIndex((a: any) => a.id === employee.id);
      this.employees.splice(index, 1);
      this.displayMessage('Deleted Sucessfully');
      this.showLoading = false;
    },
      (err) => {
        this.showLoading = false;
        console.log('error ocuur deleting employee', err);
      });
  }

  displayMessage(message: string): void {
    this.message = message;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 5000);
  }

  editEmployee(employee: any, content: any): void {
    this.isAdd = 'Update';
    this.submitted = false;
    this.employeeForm?.patchValue({
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  viewEmployee(employee: any): void {
    this.router.navigateByUrl('/employee/' + employee.id);
  }

  onSave(): void {
    this.submitted = true;
    if (this.employeeForm?.valid) {
      this.showLoading = true;
      this.modalService.dismissAll();
      if (this.employeeForm.value.id) {
        this.updateEmployee();
      } else {
        this.createEmployee();
      }
    }
  }

  get f(): any {
    return this.employeeForm ? this.employeeForm.controls : [];
  }

  addEmployee(content: any): void {
    this.isAdd = 'Add';
    this.buildForm();
    this.submitted = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateEmployee(): void {
    this.appService.updateEmployee(this.employeeForm?.value).subscribe((data) => {
      this.displayMessage('Employee Updated Sucessfully');
      this.employees.forEach((emp: any) => {
        if (this.employeeForm) {
          if (emp.id === this.employeeForm.value.id) {
            emp.first_name = this.employeeForm.value.first_name;
            emp.last_name = this.employeeForm.value.last_name;
            emp.email = this.employeeForm.value.email;
          }
        }
      });
      this.showLoading = false;
    },
      (err) => {
        this.showLoading = false;
        console.log('error ocuur adding employee', err);
      });
  }

  createEmployee(): void {
    this.appService.addEmployee(this.employeeForm?.value).subscribe((data) => {
      if (this.employeeForm && this.employeeForm.value) {
        this.employeeForm.value.id = this.randomNumber();
        this.employees.push(this.employeeForm.value);
      }
      this.displayMessage('Employee Added Sucessfully');
      this.showLoading = false;
    }, (err) => {
      this.showLoading = false;
      console.log('error ocuur updating employee', err);
    });
  }

  randomNumber(): number {
    return Math.floor(Math.random() * (1000 - 20 + 1)) + 20;
  }

}
