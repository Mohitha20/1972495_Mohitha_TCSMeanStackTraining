import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  flag:boolean = false;
  btn:string = "Start Quiz";
  ngOnInit(): void {

  }
  
  change(){
    this.flag = !this.flag;
    if (this.flag) {this.btn = "Quit Quiz";}
    else {this.btn = "Start Quiz";}
  }
}