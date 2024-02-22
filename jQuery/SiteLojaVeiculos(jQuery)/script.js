$(document).ready(function() {
  $("#carrosel").slick({
    autoplay: true,
  });

  $(".menu-hambuguer").click(function() {
    $("nav").slideToggle();
  });

  $('#telefone-input').mask("(00) 00000-0000");

  $('#formulario-contato').validate({
    rules: {
      nome: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true,
        minlength: 15
      },
      veiculoInteresse: {
        required: false,
      },
      mensagem: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      nome: "Por favor, informe seu nome",
      email: "Por favor, informe um e-mail válido",
      telefone: "Por favor, informe um telefone válido",
      mensagem: "Por favor, informe uma mensagem"
    },
    errorClass: 'mensagem-erro',
    errorElement: 'div',
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    submitHandler: function(form) {
      $('#mensagem-sucesso').text('Mensagem enviada com sucesso!').addClass('mensagem-sucesso-ativo');
      setTimeout(function() {
        $('#mensagem-sucesso').text('').removeClass('mensagem-sucesso-ativo');
      }, 5000);
      form.reset();
    }
  });

  $('.lista-veiculos button').click(function() {
    const destino = $("#contato");
    const nomeVeiculo = $(this).parent().find('h3').text();

    $('#veiculo-interesse').val(`${nomeVeiculo}`);

    $('html, body').animate({
      scrollTop: $(destino).offset().top
    }, 10);
  });
});
