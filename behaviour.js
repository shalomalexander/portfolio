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
