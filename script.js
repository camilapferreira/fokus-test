const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
let tempoDecorridoEmSegundos = 5;
let intervalorId = null;
const musica = new Audio(
  "/Alura/Fokus-projeto-base/sons/luna-rise-part-one.mp3"
);
musica.loop = true;
const audioStart = new Audio("/Alura/Fokus-projeto-base/sons/play.wav");
const audioPausa = new Audio("/Alura/Fokus-projeto-base/sons/pause.mp3");
const audioTempoFinalizado = new Audio(
  "/Alura/Fokus-projeto-base/sons/beep.mp3"
);

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute(
    "src",
    `/Alura/Fokus-projeto-base/imagens/${contexto}.png`
  );
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    default:
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.,<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

const contagemRegresssiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioStart.play();
    zerar();
    alert("tempo finalizado");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log("Temporizador: " + tempoDecorridoEmSegundos);
};
startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervalorId) {
    audioPausa.play();
    zerar();
    return;
  }
  audioStart.play();
  intervalorId = setInterval(contagemRegresssiva, 1000);
}

function zerar() {
  clearInterval(intervalorId);
  intervalorId = null;
}
