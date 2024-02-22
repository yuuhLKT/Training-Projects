const form = document.getElementById("form-atv");
const imgAprovado = '<img src="img/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="img/reprovado.png" alt="Emoji de Decepção" />';
const notasAtv = [];
const atividades = [];
const corpoTable = document.getElementById("corpo-table");
const mediaFinalInput = document.getElementById("media-final");
const mediaAtv = document.getElementById("media-atv");
const errorMsg = document.getElementById("error-msg");
const resultadoMedia = document.getElementById("resultado-media");
const mediaNecessaria = document.getElementById("media-necessaria");
const situacaoMedia = document.getElementById("situacao-media");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  adicionarTable();
});

function adicionarTable() {
  const nomeAtvInput = document.getElementById("nome-atv");
  const notaAtvInput = document.getElementById("nota-atv");

  if (atividades.includes(nomeAtvInput.value)) {
    exibirMensagemErro("ATIVIDADE JÁ EXISTENTE!");
    nomeAtvInput.style.border = "1px solid red";
  } else {
    atividades.push(nomeAtvInput.value);
    notasAtv.push(parseFloat(notaAtvInput.value));

    let linhaBodyTable = '<tr>';
    linhaBodyTable += `<td>${nomeAtvInput.value}</td>`;
    linhaBodyTable += `<td>${parseFloat(notaAtvInput.value).toFixed(2)}</td>`;
    linhaBodyTable += `<td>${parseFloat(mediaAtv.value).toFixed(2)}</td>`;
    linhaBodyTable += `<td>${parseFloat(notaAtvInput.value) >= parseFloat(mediaAtv.value) ? imgAprovado : imgReprovado}</td>`;
    linhaBodyTable += '</tr>';

    corpoTable.innerHTML += linhaBodyTable;

    calcularMedia();
    adicionarMediaTable();
  }

  nomeAtvInput.addEventListener("focus", function () {
    esconderMensagemErro();
    nomeAtvInput.style.border = "";
  });

  nomeAtvInput.value = "";
  notaAtvInput.value = "";
  mediaAtv.value = "";
}

function calcularMedia() {
  let somaNotas = notasAtv.reduce((acc, nota) => acc + nota, 0);
  let media = somaNotas / notasAtv.length || 0;
  resultadoMedia.textContent = media.toFixed(2);
}

function adicionarMediaTable() {
  const media = parseFloat(resultadoMedia.textContent);
  let mediaFinal = parseFloat(mediaFinalInput.value);

  if (mediaFinal < 0) {
    mediaFinal = 0;
  } else if (mediaFinal > 10) {
    mediaFinal = 10;
  }

  const aprovadoTxt = '<span class="resultado aprovado">Aprovado</span>';
  const reprovadoTxt = '<span class="resultado reprovado">Reprovado</span>';

  mediaNecessaria.textContent = mediaFinal.toFixed(2);
  situacaoMedia.innerHTML = media >= mediaFinal ? aprovadoTxt : reprovadoTxt;
}

function exibirMensagemErro(mensagem) {
  errorMsg.textContent = mensagem;
  errorMsg.style.display = "block";
}

function esconderMensagemErro() {
  errorMsg.style.display = "none";
}
