import {menu_card, side_menu_arr} from "./side_menu.js"
import { todo_status_list } from "./todo_class.js";

const todo_table = document.getElementsByClassName("_todo_table")[0];

let dragable = false;

document.body.ondragstart = function(){
  return false;
}

todo_table.addEventListener("mousedown", (e) => {
  const cursoroncard = e.target.closest("._col_elem");
  if (cursoroncard != null) {
    dragable = true;
  }
});

todo_table.addEventListener("mousemove", (e) => {
  const cursoroncard = e.target.closest("._col_elem");
  const is_editing = document.getElementsByClassName("_col_elem_with_input");
  if (cursoroncard && dragable && !is_editing.length) {
    dragcard(e);
    dragable = false;
  }
});

todo_table.addEventListener("mouseup", (e) => {
  const row_loc = e.target.closest("._row_elem");
  if (row_loc != null) {
    dragable = false;
  }
});

function dragcard(e){
  const moving_card = e.target.closest("._col_elem");
  const moving_card_title = moving_card.childNodes[0].childNodes[0].innerText;
  let old_title = moving_card.parentNode.firstChild.firstChild.innerText;
  let new_title;

  const illusion_of_moving_card = moving_card.cloneNode(true);
  illusion_of_moving_card.classList.add("illusion");

  moving_card.after(illusion_of_moving_card);

  let shiftX = e.clientX - e.target.getBoundingClientRect().left;
  let shiftY = e.clientY - e.target.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    moving_card.style.left = pageX - shiftX + 'px';
    moving_card.style.top = pageY - shiftY + 'px';
  }

  moveAt(e.pageX, e.pageY);

  function onMouseMove(e) {
    moving_card.classList.add("moving");
    document.body.append(moving_card);
    moveAt(e.pageX, e.pageY);
    document.body.style.userSelect='none';
    let element_at_cursor = document.elementFromPoint(e.clientX, e.clientY);
    const new_location_for_moving_card = element_at_cursor.closest("._row_elem");

    const cursor_between_cards = element_at_cursor.closest("._col_elem");
    if(new_location_for_moving_card && cursor_between_cards){
      new_title = new_location_for_moving_card.firstChild.firstChild.innerText;
      const half_of_card_height = (cursor_between_cards.getBoundingClientRect().top + cursor_between_cards.getBoundingClientRect().bottom)/2;
      if(e.pageY > half_of_card_height) {
        cursor_between_cards.insertAdjacentElement("afterend", illusion_of_moving_card);
      }
      else {
        cursor_between_cards.insertAdjacentElement("beforebegin", illusion_of_moving_card);
      }
    }
    else if(new_location_for_moving_card && cursor_between_cards == null){
      new_title = new_location_for_moving_card.firstChild.firstChild.innerText;
      // const col_name_of_new_location = new_location_for_moving_card.childNodes[0];
      new_location_for_moving_card.append(illusion_of_moving_card)
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  function onmouseup() {
    document.removeEventListener('mousemove', onMouseMove);
    moving_card.classList.remove("moving");
    illusion_of_moving_card.after(moving_card);
    illusion_of_moving_card.remove();

    if(old_title != new_title) {
      const cur_time = new Date();
      const new_info_to_side_card = new menu_card(old_title, new_title, moving_card_title, cur_time, "이동");

      side_menu_arr.card_array_push(new_info_to_side_card);
    }
    moving_card.onmouseup = null;
    document.removeEventListener('mouseup', onmouseup);

    update_storage(old_title, new_title, moving_card);
  };

  document.addEventListener('mouseup', onmouseup);
}

function update_storage(old_title, new_title, moving_card){
  const old_column = todo_status_list.filter(item => item.status == old_title);
  const moved_card = old_column[0].status_elem_list.filter(item => item.title == moving_card.childNodes[0].childNodes[0].innerText);
  const new_column = todo_status_list.filter(item => item.status == new_title);

  old_column[0].list_pop(moved_card[0].title);
  new_column[0].list_push(moved_card[0]);

  const old_column_circle = document.getElementById("circle_" + old_title);
  const new_column_circle = document.getElementById("circle_" + new_title);

  console.log(old_column[0].status_elem_list);
  console.log(new_column[0].status_elem_list);
  old_column_circle.innerHTML = `<div class="total_num">${old_column[0].status_elem_list.length}</div>`;
  new_column_circle.innerHTML = `<div class="total_num">${new_column[0].status_elem_list.length}</div>`;
}

