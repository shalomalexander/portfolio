function toggleFunction() {
    var x = document.getElementById("header-nav");
    var main = document.getElementById("main-id");

    if (x.style.display === "none") {
      x.style.display = "block";
      //main.style.backgroundColor = "whitesmoke";
      main.style.opacity = "10%";
     // x.style.visibility = "visible";
    } else {
      x.style.display = "none";
      main.style.backgroundColor = "";
      main.style.opacity = ""
    }
  }

function toggleDisplayOfNavigation() {
    var w = window.outerWidth;
    var x = document.getElementById("header-nav");
    if(w>481) {
        
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 

var modal1 = false; 
var modal2 = false;
var modal3 = false;
var modal4 = false;

function toggleModal(id) {
  console.log(id);
  if(id==="ehr") {
    modal1 = !modal1;
    var element = document.getElementById("modal-ehr");
    if(modal1) {
      element.classList.add("active");
      return;
    } 

    element.classList.remove("active");
  }

  if (id==="google-meet-tracker") {
    modal2 = !modal2;
    var element = document.getElementById("modal-google-meet-tracker");
    if(modal2) {
      element.classList.add("active");
      return;
    } 
    element.classList.remove("active");
  }

  if (id==="wol") {
    modal3 = !modal3;
    var element = document.getElementById("modal-wol");
    if(modal3) {
      element.classList.add("active");
      return;
    } 
    element.classList.remove("active");
  }

  if (id==="meal") {
    modal4 = !modal4;
    var element = document.getElementById("modal-meal");
    if(modal4) {
      element.classList.add("active");
      return;
    } 
    element.classList.remove("active");
  }
 
}
