import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  username:string = '';
  @ViewChild('name') inputName:any;
  @ViewChild('number') inputNumber:any;

  constructor() { }

  ngOnInit(): void {
    this.retrieveFromSession();
  }

  retrieveFromSession(){
    let stringified:any = sessionStorage.getItem("userInfo");
    let info = JSON.parse(stringified);
    this.username = info[0].username;
  }

  insertNewContact(name:any,number:any) {
    let table:any = document.getElementById("contact");
    let body = table.getElementsByTagName("tbody")[0]; 
    let newRow = body.insertRow(body.length);  
    
    let cell1 = newRow.insertCell(0);           
    cell1.innerHTML=name;                  

    let cell2 = newRow.insertCell(1);           
    cell2.innerHTML=number;                  
    this.reset();
  }
  reset(){
    this.inputName.nativeElement.value = "";
    this.inputNumber.nativeElement.value = "";

  }
}
