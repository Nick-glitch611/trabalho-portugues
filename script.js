const start = document.getElementById("iniciar");

start.addEventListener("click", () => {
  document.getElementById("quiz").style.display="block"
});

const nome = document.getElementById("nome").value;

if (nome === ""){
  aler("digite seu nome")
  return;
}
