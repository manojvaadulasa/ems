import { CommonModule } from "@angular/common";
import { Component,OnDestroy,OnInit, inject, signal } from "@angular/core";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from "@angular/common/http";
import { EmployeeInterface } from "./employee.interface";
import { Subject, takeUntil } from "rxjs";
import { environment } from "../../environments/environment.development";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  templateUrl:'./employee.component.html',
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
  ],
  selector:'em-employee'
})
export class EmployeeComponent implements OnInit,OnDestroy{

  toForm = signal(false);
  toEditForm = signal(false);
  data$:EmployeeInterface[]=[];
  editDeleteData:EmployeeInterface | null = null;
  form = new FormGroup({
    "firstName": new FormControl(''),
    "surName":new FormControl(''),
    "email":new FormControl('',[Validators.required,Validators.email])
  });
  editingForm = new FormGroup({
    "id": new FormControl(0),
    "firstName": new FormControl(''),
    "surName":new FormControl(''),
    "email":new FormControl('',[Validators.required,Validators.email])
  });
  unsubscribe$=new Subject<void>();
  url:string=environment.URL;

  http=inject(HttpClient);

  public ngOnInit():void{
    this.getAllEmployees();
  }

  public getAllEmployees():void{
    this.http.get(this.url+"employees")
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res:EmployeeInterface[] | any)=>{
      this.data$=res;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm():void{
    this.http.post(this.url+"employees",this.form.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllEmployees());
    this.toForm.set(false);
  }

  onClickUpdate(data:EmployeeInterface):void{
    this.editingForm.setValue({
      "id": data.id,
      "firstName": data.firstName,
      "surName": data.surName,
      "email": data.email
    });
    this.toForm.set(true);
    this.toEditForm.set(true);
  }

  submitEditForm():void{
    let updateUrl:string=`employees/${this.editingForm.get("id")?.value}`;
    this.http.put(this.url+updateUrl,this.editingForm.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllEmployees());
    this.toEditForm.set(false);
    this.toForm.set(false);
  }

  onClickDelete(data:EmployeeInterface):void{
    let updateUrl:string=`employees/${data.id}`;
    this.http.delete(this.url+updateUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>{
        this.getAllEmployees();
      },(error)=>{
        this.getAllEmployees();
      });
  }

}
