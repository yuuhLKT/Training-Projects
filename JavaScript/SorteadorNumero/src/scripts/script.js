document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteio').addEventListener('submit', function(e){
        e.preventDefault();

        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;

        document.getElementById('resultado').innerHTML = numeroAleatorio;
    });
});