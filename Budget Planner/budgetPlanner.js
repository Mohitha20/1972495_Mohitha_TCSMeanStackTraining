

function tableNumbers() {
    var obj = sessionStorage.getItem("tableInfo");
    var data = JSON.parse(obj);
    var total = 0;
  
    data.forEach((element) => {
      insertNewRecord(element);
      total = total + parseInt(element.budget);
    });
  
    var objectTotal = {
      clientName: "Total",
      projectName: "",
      budget: total,
    };
    insertNewRecord(objectTotal);
  }
  
  function onFormSubmit() {
    var data = readFormData();
    resetData();
    //   insertNewRecord(data);
    var tableObject = JSON.parse(sessionStorage.getItem("tableInfo"));
  
    if (tableObject == null) {
      tableObject = [];
    }
    tableObject.push(data);
  
    sessionStorage.setItem("tableInfo", JSON.stringify(tableObject));
  }
  
  
  function readFormData() {
    var obj = {};
    obj.clientName = document.getElementById("clientName").value;
    obj.projectName = document.getElementById("projectName").value;
    obj.budget = document.getElementById("budget").value;
  
    return obj;
  }

  function insertNewRecord(data) {
    var table = document.getElementById("clientList");
    var body = table.getElementsByTagName("tbody")[0];
  
    var newRow = body.insertRow(body.length); 
  
    var cell1 = newRow.insertCell(0); 
    cell1.innerHTML = data.clientName; 
    var cell2 = newRow.insertCell(1); 
    cell2.innerHTML = data.projectName; 
    var cell3 = newRow.insertCell(2); 
    cell3.innerHTML = "$" + data.budget; 
  }
  
  function resetData() {
    document.getElementById("clientName").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("budget").value = "";
  }