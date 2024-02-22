$(document).ready(function() {

  $("#cpf").mask("000.000.000-00")
  $("#cep").mask("00000-000")
  $("#telefone").mask("(00) 00000-0000")

  $('#cadastroForm').validate({
    rules: {
      nomeCompleto: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      cpf: {
        required: true,
      },
      endereco: {
        required: true
      },
      cep: {
        required: true,
      }
    },
    messages: {
      nomeCompleto: "Por favor, informe seu nome",
      email: "Por favor, informe um e-mail válido",
      telefone: "Por favor, informe um telefone válido",
      cpf: "Por favor, informe seu CPF",
      endereco: "Por favor, informe seu endereço",
      cep: "Por favor, informe seu CEP"
    },
    errorClass: 'mensagem-erro',
    errorElement: 'div',
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    submitHandler: function(form) {
      $('#mensagem-sucesso').text('Cadastro realizado com sucesso!').addClass('mensagem-sucesso-ativo');
      setTimeout(function() {
        $('#mensagem-sucesso').text('').removeClass('mensagem-sucesso-ativo');
      }, 5000);
      form.reset();
    }
  });
});