import { enter_new_column_name } from "./template.js";
import { menu_visible } from "./side_menu.js";

const todo_table = document.getElementsByClassName("_todo_table")[0];

todo_table.addEventListener('dblclick', (e) => edit_column_name(e));

const column_add_button = document.getElementById("#column_add_button");
column_add_button.addEventListener('click', enter_new_column_name)


// 화면 오른쪽에 기록 화면 추가 -> visable
const show_menu = document.getElementById("top_button");
show_menu.addEventListener('click', menu_visible);