const form = document.getElementById('contactForm');
var nameV, emailV, messageV;

function readFom() {
  nameV = document.getElementById("name").value;
  emailV = document.getElementById("email").value;
  messageV = document.getElementById("message").value;
  console.log(nameV,emailV,messageV);
}

const firebaseConfig = {
    apiKey: "AIzaSyDTIeJyZY45qq8PKQ8nl1SFgvM2X_e7w-w",
    authDomain: "contactform-d764f.firebaseapp.com",
    databaseURL: "https://contactform-d764f-default-rtdb.firebaseio.com",
    projectId: "contactform-d764f",
    storageBucket: "contactform-d764f.appspot.com",
    messagingSenderId: "968487961535",
    appId: "1:968487961535:web:55dcdda0a92b875681d70a",
    measurementId: "G-51EK9X914M"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  document.getElementById("insert").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("messages/" + nameV)
      .set({
        name: nameV,
        email:emailV,
        message: messageV
      });
    alert("Data Inserted");
    form.reset();
  };
  
  
  document.getElementById("update").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("messages/" + nameV)
      .update({
        //name: nameV,
        email: emailV,
        message: messageV,
      });
    alert("Data Update");
    form.reset();
  };
  document.getElementById("delete").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("messages/" + emailV)
      .remove();
    alert("Data Deleted");
    form.reset();
  };
  



var tbody = document.getElementById('tbody1');
function AddItemToTable(name,email,message){
  let trow = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');

  td1.innerHTML=name;
  td2.innerHTML=email;
  td3.innerHTML=message;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);

  tbody.appendChild(trow);
}

function AddAllItemsToTable(TheStudent){
  tbody.innerHTML="";
  TheStudent.forEach(element => {
    AddItemToTable(element.name,element.email,element.message);
  });
}

function GetAllDataRealtime(){
  firebase.database().ref("messages").on("value",(snapshot)=>{
    var students = [];
    snapshot.forEach(childsnapshot=>{
      students.push(childsnapshot.val());
    });
    AddAllItemsToTable(students);
  })
}
window.onload=GetAllDataRealtime;
