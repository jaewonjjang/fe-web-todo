import {todo_status_list, todo_elem_list, card_elem_list} from "./todo_class.js" 

function increase_total_num(id, title, contents){
    const modify_circle = document.getElementById("circle_" + id);
    const new_card_to_column = new card_elem_list(title.value, contents.value);

    const modify_status = todo_status_list.filter(item => item.status == id);
    modify_status[0].list_push(new_card_to_column);
    const modify_total_num = modify_status[0].status_elem_list;
    modify_circle.innerHTML = `${modify_total_num.length}`;
}

function decrease_total_num(id, value){
    const modify_status = todo_status_list.filter(item => item.status == id);
    const modify_card = modify_status[0].status_elem_list.filter(item => item.title == value);

    //console.log(modify_card);
    modify_status[0].list_pop(modify_card[0]);

    const modify_circle = document.getElementById("circle_" + id);
    modify_circle.innerHTML = `${modify_status[0].status_elem_list.length}`;
}

export {increase_total_num, decrease_total_num};

