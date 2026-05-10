const start = document.getElementById("iniciar");
const quiz = document.getElementById("quiz");
const timerHTML = document.getElementById("timer");

let atual = 1;
let pontos = 0;
let tempo = 30;
let intervalo;

// função do timer
function iniciarTimer() {

  tempo = 30;
  timerHTML.innerText = `Tempo: ${tempo}s`;

  intervalo = setInterval(() => {

    tempo--;

    timerHTML.innerText = `Tempo: ${tempo}s`;

    // acabou o tempo
    if (tempo === 0) {

      clearInterval(intervalo);

      passarPergunta();
    }

  }, 1000);
}

// função para trocar de pergunta
function passarPergunta() {

  document.getElementById("p" + atual).style.display = "none";

  atual++;

  const proxima = document.getElementById("p" + atual);

  if (proxima) {

    proxima.style.display = "block";

    iniciarTimer();

  } else {

    const nome = document.getElementById("nome").value;

    quiz.style.display = "none";
    timerHTML.style.display = "none";

    document.body.innerHTML += `
      <div id="resultado">
        <h2>${nome}, você terminou o quiz!</h2>
        <p>Você fez ${pontos} de 17 pontos.</p>
      </div>
    `;
  }
}

start.addEventListener("click", () => {

  const nome = document.getElementById("nome").value;

  if (nome === "") {
    alert("Digite seu nome");
    return;
  }

  // esconder conteúdo inicial
  document.getElementById("galeria").style.display = "none";
  document.getElementById("secao").style.display = "none";
  document.getElementById("duvidas").style.display = "none";
  document.getElementById("nome").style.display = "none";
  document.getElementById("iniciar").style.display = "none";

  // mostrar quiz
  quiz.style.display = "block";
  document.getElementById("p1").style.display = "block";

  iniciarTimer();
});

// clique nas respostas
quiz.addEventListener("click", (event) => {

  if (event.target.tagName === "BUTTON") {

    clearInterval(intervalo);

    // acertou?
    if (event.target.dataset.correta === "true") {
      pontos++;
    }

    passarPergunta();
  }
});
function carregarRanking() {
  fetch("/ranking")
    .then(r => r.json())
    .then(dados => {
      const tbody = document.getElementById("ranking-body");
      if (!tbody) return;
      if (dados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#888;">Nenhuma pontuação ainda.</td></tr>';
        return;
      }
      tbody.innerHTML = dados.map((item, i) => {
        const medalha = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1);
        return `<tr style="border-bottom:1px solid #d9cfc5;">
          <td style="padding:10px 8px; color:#3a2a1a;">${medalha}</td>
          <td style="padding:10px 8px; color:#3a2a1a;">${item.nome}</td>
          <td style="padding:10px 8px; text-align:right; color:#3a2a1a; font-weight:bold;">${item.pontuacao}/17</td>
        </tr>`;
      }).join("");
    })
    .catch(() => {
      const tbody = document.getElementById("ranking-body");
      if (tbody) tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:red;">Erro ao carregar ranking.</td></tr>';
    });
}
