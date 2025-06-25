

let branco = true;

document.getElementById("mudar_cor").addEventListener("click", function () {
  
  
    if(branco) {
        document.body.style.backgroundColor = "black";
        branco = false;
    }else {
        document.body.style.backgroundColor = "white";
        branco = true;
    }
   
});
