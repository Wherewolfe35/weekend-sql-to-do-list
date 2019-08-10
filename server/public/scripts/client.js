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
    let newItem = $(`<li class="toDoItem">${item.item}</li>`);
    newItem.data('id', item.id);
    if (item.completed === false){
      newItem.prepend('<input type="checkbox" class="checkBox">')
    } else if (item.completed === true){
      newItem.prepend(`<input type="checkbox" checked="checked" class="checkBox">`)
    }
    $('#toDoList').append(newItem);
  }
}