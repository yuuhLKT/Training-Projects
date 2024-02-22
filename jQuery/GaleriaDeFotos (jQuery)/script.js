const closeImg = $('<img src="img/close.png" class="close" title="Apagar Imagem" alt="Apagar Imagem">');
const form = $('form');
const urlInput = $('#url-img-nova');
const imageList = $('ul');

$(document).ready(function() {
  $('header button').click(function() {
    form.slideToggle(250);
  });  
});

$('#btn-cancelar').click(function() {
  form.slideUp(250);
});

form.on('submit', function(e) {
  e.preventDefault();
  const urlNovaImg = urlInput.val();
  const addItem = $('<li style="display: none"></li>');

  closeImg.clone().appendTo(addItem);
  $(`<img src="${urlNovaImg}" class="image">`).appendTo(addItem);
  $(`
    <div class="img-link">
      <a href="${urlNovaImg}" target="_blank">Ver Imagem em Tamanho Real</a>
    </div>`).appendTo(addItem);

  imageList.append(addItem);
  addItem.fadeIn(250);
  urlInput.val('');
});

$('#clear-all').click(function() {
  imageList.fadeOut(250, function() {
    imageList.empty().fadeIn(250);
  });
});

imageList.on('click', '.close', function() {
  const listItem = $(this).parent();
  listItem.fadeOut(250, function() {
    listItem.remove();
  });
});


