$(document).ready(function () {
  const taskInput = $('.todoInput');
  const form = $('form');
  const removeTask = $('<img src="img/close.png" class="apagar" title="Apagar Tarefa" alt="Apagar Tarefa">');
  const ongoingClass = 'taskItem';
  const completedClass = 'completedTasks';

  form.on('submit', function (e) {
    e.preventDefault();

    const taskList = $('#ongoingTasks');
    const ongoingList = $(`<li class="${ongoingClass}"></li>`).appendTo(taskList);
    const ongoingListDiv = $(`<div class="${ongoingClass}"></div>`).appendTo(ongoingList);
    const checkboxSpan = $(`<span class="${ongoingClass}"><input type="checkbox"/>${taskInput.val()}</span>`).appendTo(ongoingListDiv);
    removeTask.clone().appendTo(ongoingListDiv);

    taskInput.val('');

    $('.apagar').on('click', function (e) {
      e.preventDefault();
      $(this).parent().parent().remove();
    });

    checkboxSpan.find('input[type="checkbox"]').on('change', function () {
      const taskItem = $(this).closest('li');
      taskItem.toggleClass(ongoingClass, !$(this).prop('checked'));
      taskItem.toggleClass(completedClass, $(this).prop('checked'));
      taskItem.find('div, span').toggleClass(completedClass, $(this).prop('checked'));
    });
  });
});
