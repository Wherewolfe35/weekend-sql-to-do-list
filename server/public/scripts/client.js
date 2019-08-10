$(document).ready(readyOn);

function readyOn() {
  console.log('jQuery is ready');
  getList();
  $('#addBtn').on('click', addItem)
  $('.fullList').on('click', '.checkBox', completed)
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
  $('#completedtoDoList').empty();
  $('#uncompletedtoDoList').empty();
  $('#uncompletedtoDoList').append(`<li>Yet To Do:</li>`);
  $('#completedtoDoList').append(`<li>Done:</li>`);
  for (const item of listArray) {
    let newItem = $(`<li class="toDoItem">${item.item}</li>`);
    newItem.data('id', item.id);
    newItem.append(`<button class="removeBtn">Remove</button>`);
    if (item.completed === false){
      newItem.prepend('<input type="checkbox" class="checkBox">');
      $('#uncompletedtoDoList').append(newItem);
    } else if (item.completed === true){
      newItem.prepend(`<input type="checkbox" checked="checked" class="checkBox">`);
      $('#completedtoDoList').append(newItem);
    }
  }
}

function addItem() {
  let newItem = {
    item: $('#itemIn').val()
  };
  console.log('Adding item to list', newItem);
  $.ajax({
    method: 'POST',
    url: '/items',
    data: newItem
  }).then((response) => {
    console.log('Item added', response);
    getList();
  }).catch((error) => {
    console.log(error);
    alert('We are experiencing technical issues, please try again later. Thank you.');
  })
}

function completed() {
  let idToUpdate = $(this).closest('li').data('id');
  console.log('completing task on', idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/items/${idToUpdate}`
  }).then((response) => {
    console.log('task updated', response);
    getList();
  }).catch((error) => {
    console.log(error);
    alert('We are experiencing technical issues, please try again later. Thank you.');
  })
}