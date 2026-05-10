const start = document.getElementById("iniciar");
const quiz = document.getElementById("quiz");

let atual = 1;
let pontos = 0;

start.addEventListener("click", () => {

  const nome = document.getElementById("nome").value;

  if (nome === "") {
    alert("Digite seu nome");
    return;
  }

  quiz.style.display = "block";
});

quiz.addEventListener("click", (event) => {

  if (event.target.tagName === "BUTTON") {

    // verifica se acertou
    if (event.target.dataset.correta === "true") {
      pontos++;
    }

    // esconde pergunta atual
    document.getElementById("p" + atual).style.display = "none";

    atual++;

    const proxima = document.getElementById("p" + atual);

    if (proxima) {

      // mostra próxima pergunta
      proxima.style.display = "block";

    } else {

      // fim do quiz
      const nome = document.getElementById("nome").value;

      quiz.style.display = "none";

      document.body.innerHTML += `
        <div id="resultado">
          <h2>${nome}, você terminou o quiz!</h2>
          <p>Você fez ${pontos} pontos de 17.</p>
        </div>
      `;
    }
  }
});
