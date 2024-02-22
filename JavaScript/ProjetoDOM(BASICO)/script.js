const formEnviar = document.getElementById("btn-enviar");
const mensagem = document.getElementById("erro-sucsess");

formEnviar.addEventListener("click", function(e){
  e.preventDefault();
  validar();
});

function validacao(){
  const numeroA = document.getElementById("campoA").value;
  const numeroB = document.getElementById("campoB").value;

  if(numeroB > numeroA){
    mensagem.innerText = "O Formulário foi enviado com sucesso";
    mensagem.classList.add("sucess");
    mensagem.classList.remove("erro");
  } else {
    mensagem.innerText = "O Número do Campo A é maior que o número do Campo B";
    mensagem.classList.add("erro");
    mensagem.classList.remove("sucess");
  }
}

function limpar(){
  const numeroA = document.getElementById("campoA");
  const numeroB = document.getElementById("campoB");

  numeroA.addEventListener("input", function(){
    mensagem.innerText = "";
    mensagem.classList.remove("erro");
    mensagem.classList.remove("sucess");
  });

  numeroB.addEventListener("input", function(){
    mensagem.innerText = "";
    mensagem.classList.remove("erro");
    mensagem.classList.remove("sucess");
  });
}

function validar(){
  validacao();
  limpar();
}
