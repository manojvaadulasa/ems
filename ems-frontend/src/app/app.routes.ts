import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./employee/employee.component').then(component=>component.EmployeeComponent)
  },
  {
    path:'department',
    loadComponent:()=>import('./department/department.component').then(component=>component.DepartmentComponent)
  }
];
