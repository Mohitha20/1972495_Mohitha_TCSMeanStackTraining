import {  Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { task } from '../task.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  taskArr:Array<task>=[];
  constructor(public taskSer:EmployeeService ) { }

  ngOnInit(): void {
    this.taskSer.loadTask().subscribe(result=>{this.taskArr=result
    console.log(this.taskArr);
    });
  }

  storeTask(taskRef:any){
    this.taskSer.storeTask(taskRef);
  }

}

