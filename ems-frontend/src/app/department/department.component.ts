import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from "@angular/common/http";
import { Subject, takeUntil } from "rxjs";
import { environment } from "../../environments/environment.development";
import { FormControl, FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentInterface } from "./department.interface";

@Component({
  selector:'em-department',
  templateUrl:'./department.component.html',
  standalone:true,
  imports:[
    CommonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class DepartmentComponent implements OnInit,OnDestroy{

  toForm = signal(false);
  toEditForm = signal(false);
  data$:DepartmentInterface[]=[];
  editDeleteData:DepartmentInterface | null = null;
  form = new FormGroup({
    "departmentName": new FormControl(''),
    "departmentDescription":new FormControl('')
  });
  editingForm = new FormGroup({
    "id": new FormControl(0),
    "departmentName": new FormControl(''),
    "departmentDescription":new FormControl('')
  });
  unsubscribe$=new Subject<void>();
  url:string=environment.URL;

  http=inject(HttpClient);

  public ngOnInit():void{
    this.getAllDepartments();
  }

  public getAllDepartments():void{
    this.http.get(this.url+"departments")
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res:DepartmentInterface[] | any)=>{
      this.data$=res;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm():void{
    this.http.post(this.url+"departments",this.form.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllDepartments());
    this.toForm.set(false);
  }

  onClickUpdate(data:DepartmentInterface):void{
    this.editingForm.setValue({
      "id": data.id,
      "departmentName": data.departmentName,
      "departmentDescription": data.departmentDescription,
    });
    this.toForm.set(true);
    this.toEditForm.set(true);
  }

  submitEditForm():void{
    let updateUrl:string=`departments/${this.editingForm.get("id")?.value}`;
    this.http.put(this.url+updateUrl,this.editingForm.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllDepartments());
    this.toEditForm.set(false);
    this.toForm.set(false);
  }

  onClickDelete(data:DepartmentInterface):void{
    let updateUrl:string=`departments/${data.id}`;
    this.http.delete(this.url+updateUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllDepartments(),()=>this.getAllDepartments());
  }

}
