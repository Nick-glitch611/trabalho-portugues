const start = document.getElementById("iniciar");

start.addEventListener("click", () => {

  const nome = document.getElementById("nome").value;
  
  if (nome === ""){
    alert("digite seu nome")
    return;
  }
    
  document.getElementById("quiz").style.display="block"
});
