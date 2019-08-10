$(document).ready(readyOn);

function readyOn() {
  console.log('jQuery is ready');
  getList();
}

function getList() {
  console.log('getting list from server');
  $.ajax({
    method: 'GET',
    url: '/items'
  }).then((response) => {
    console.log('List received', response);
    renderList(response);
  })
}

function renderList(listArray) {
  console.log('rendering list');
  for (const item of listArray) {
    let newItem = $(`<li>${item.item}  ${item.completed}</li>`);
    newItem.data('id', item.id);
    $('#toDoList').append(newItem);
  }
}