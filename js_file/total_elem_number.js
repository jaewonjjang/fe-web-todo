import {todo_status_list, card_elem_list} from "./todo_class.js" 

function increase_total_num(id, title, contents){
    const date = new Date();
    const modify_circle = document.getElementById("circle_" + id);
    const new_card_to_column = new card_elem_list(title, contents, date.getTime());

    const modify_status = todo_status_list.filter(item => item.status == id);
    modify_status[0].list_push(new_card_to_column);
    const modify_total_num = modify_status[0].status_elem_list;
    modify_circle.innerHTML = `<div class="total_num">${modify_total_num.length}</div>`;
}

function decrease_total_num(id, value){
    const modify_status = todo_status_list.filter(item => item.status == id);
    const modify_card = modify_status[0].status_elem_list.filter(item => item.title == value);

    modify_status[0].list_pop(modify_card[0].title);

    const modify_circle = document.getElementById("circle_" + id);
    modify_circle.innerHTML = `<div class="total_num">${modify_status[0].status_elem_list.length}</div>`;
}

export {increase_total_num, decrease_total_num};

