let obj = require("readline-sync");
let fs = require("fs");

module.exports.logRecord = function () {
  let id = obj.question("Enter your id ");
  console.log("Your id is " + id);
  debugger;
  let firstname = obj.question("Enter your First Name ");
  console.log("Your First Name is " + firstname);
  debugger;
  let lastname = obj.question("Enter your Last name ");
  console.log("Your Last name is " + lastname);
  debugger;
  let gender = obj.question("Enter your gender ");
  console.log("Your gender is " + gender);
  debugger;
  let salary = obj.question("Enter your salary ");
  console.log("Your salary is " + salary);
  debugger;
  let email = obj.question("Enter your email ");
        while (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false){
          console.log("Your email is " + email);
        }
    debugger;

  let jsonArray = new Array();
  let data = fs.readFileSync("Records.json");       
  if (data.toString()) {
    jsonArray = JSON.parse(data.toString());
  }

  let currentDate = new Date();                  
  let date =  currentDate.getDate() + "-" +(currentDate.getMonth() + 1) + "-" +   currentDate.getFullYear() + " time : " +  currentDate.getHours() +":" +  currentDate.getMinutes() + ":" + currentDate.getSeconds();
  currentDate.getDate() 

  let jsObj = {id,firstname,lastname,gender,salary,email,date,};
  jsonArray.push(jsObj);

  let jsString = JSON.stringify(jsonArray);
  fs.writeFileSync("Records.json","\n\n" +jsString);           
  console.log("successfully saved");
  debugger;
};