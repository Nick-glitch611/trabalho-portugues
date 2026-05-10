const start = document.getElementById("iniciar");

start.addEventListener("click", () => {

  const nome = document.getElementById("nome").value;

  if (nome === "") {
    alert("Digite seu nome");
    return;
  }

  document.getElementById("quiz").style.display = "block";
});

const resposta = document.getElementById("quiz");

let atual = 1;

resposta.addEventListener("click", (event) => {

  if (event.target.tagName === "BUTTON") {
    
    document.getElementById("p" + atual).style.display = "none";

    atual++;

    const proxima = document.getElementById("p" + atual);

    if (proxima) {
      proxima.style.display = "block";
    } else {
      alert("Fim do quiz!");
    }
  }
});
