import {todo_status_list, todo_elem_list} from "./todo_class.js" 
import {side_menu_card, side_menu_arr} from "./side_menu.js"
import {increase_total_num, decrease_total_num} from "./total_elem_number.js"

const todo_table = document.getElementsByClassName("_todo_table")[0];

todo_table.addEventListener('dblclick', (e) => edit_column_name(e));

const column_add_button = document.getElementById("#column_add_button");
column_add_button.addEventListener('click', enter_new_column_name)

//새롭게 생성할 column의 이름을 입력받는 함수
function enter_new_column_name(){
    const modal_in_display = document.getElementById("#_todo_table");
    const new_modal = document.createElement("section");
    new_modal.id = "modal";
    
    new_modal.innerHTML = `<div id="modal_center_adding_new_col">
                                    <span id="modal_title">추가할 항목의 이름을 입력해주세요</span>
                                    <input id = new_col_name>
                                    <div id="modal_button_group">
                                        <button class="modal_button" id="modal_cancel_button" style="background-color: lightgrey;">
                                            취소
                                        </button>
                                        <button class="modal_button" id="modal_add_button" style="background-color: lightblue;">
                                            추가
                                        </button>
                                    </div>
                                </div>`
    
    modal_in_display.after(new_modal);

    
    const cancel_btn = document.getElementById("modal_cancel_button");
    cancel_btn.addEventListener('click', cancel_action);

    const entered_new_col_name = document.getElementById("new_col_name");
    const add_btn = document.getElementById("modal_add_button");
    add_btn.addEventListener('click', () =>{ 
        make_new_column(entered_new_col_name);
    })
}

// 입력받은 값으로 새로운 column 생성
function make_new_column(input_box){
    const entered_new_col_name = input_box.value;
    //console.log(entered_new_col_name);
    const deltag = input_box.parentNode.parentNode;

    deltag.remove();

    const new_row = document.createElement("div");
    new_row.classList.add("_row_elem");

    const todo_table_location = document.getElementsByClassName("_todo_table")[0];
    todo_table_location.append(new_row);

    const new_col = document.createElement("div");
    new_col.classList.add("_col_header");
    new_col.setAttribute("id", "_col_header_" + entered_new_col_name);
    

    new_col.innerHTML = `<h2>${entered_new_col_name}</h2>
                        <div class = "circle" id ="circle_${entered_new_col_name}">
                            <div class="total_num">
                                0
                            </div>
                        </div>
                        <div>
                            <button class="my_button_add_list" id="add_${entered_new_col_name}">
                                <i class="fa fa-plus"></i>
                            </button>
                            <button class="my_button_remove_list" id="del_${entered_new_col_name}">
                                <i class="fa fa-remove"></i>
                            </button>
                        </div>`

    new_row.prepend(new_col);

    make_add_button_active(entered_new_col_name);
    make_delete_button_active(entered_new_col_name);

    const temp = new todo_elem_list(entered_new_col_name/*status*/);
    todo_status_list.push(temp);
}

// column +에 이벤트 추가
function make_add_button_active(new_col_name){
    const add_btn = document.getElementById("add_" + new_col_name);

    add_btn.addEventListener('click', () =>{
        show_modal_add(new_col_name);
    })
}

// column -에 이벤트 추가
function make_delete_button_active(new_col_name){
    const del_btn = document.getElementById("del_" + new_col_name);

    del_btn.addEventListener('click', () =>{
        show_modal_delete(new_col_name);
    })
}

// 화면에 모달 생성(카드 추가 이벤트)
function show_modal_add(new_col_name){
    const modal_in_display = document.getElementById("#_todo_table");
    const new_modal = document.createElement("section");
    new_modal.id = "modal";
    
    new_modal.innerHTML = `<div id="modal_center">
                                    <span id="modal_title">새로운 항목을 등록하시겠습니까?</span>
                                    <div id="modal_button_group">
                                        <button class="modal_button" id="modal_cancel_button" style="background-color: lightgrey;">
                                            취소
                                        </button>
                                        <button class="modal_button" id="modal_add_button" style="background-color: lightblue;">
                                            등록
                                        </button>
                                    </div>
                                </div>`
    
    modal_in_display.after(new_modal);

    const add_btn = document.getElementById("modal_add_button");
    add_btn.addEventListener('click', () =>{ 
        add_card_to_col(new_col_name);
    })

    const cancel_btn = document.getElementById("modal_cancel_button");
    cancel_btn.addEventListener('click', cancel_action);
}

// 모달에서 취소를 누른 경우
function cancel_action() {
    const modal_display = document.getElementById("modal");
    modal_display.remove();
}

// 모달에서 삭제를 누른 경우(컬럼 전체 삭제시)
function show_modal_delete(new_col_name){
    const modal_in_display = document.getElementById("#_todo_table");
    const new_modal = document.createElement("section");
    new_modal.id = "modal";
    
    new_modal.innerHTML = `<div id="modal_center">
                                    <span id="modal_title">항목을 삭제하시겠습니까?</span>
                                    <div id="modal_button_group">
                                        <button class="modal_button" id="modal_cancel_button" style="background-color: lightgrey;">
                                            취소
                                        </button>
                                        <button class="modal_button" id="modal_delete_column_button" style="background-color: lightblue;">
                                            삭제
                                        </button>
                                    </div>
                                </div>`
    
    modal_in_display.after(new_modal);

    const del_btn = document.getElementById("modal_delete_column_button");
    del_btn.addEventListener('click', () =>{ 
        delete_column_from_todo_table(new_col_name);
    })
    const cancel_btn = document.getElementById("modal_cancel_button");
    cancel_btn.addEventListener('click', cancel_action);
}

// 컬럼에 카드를 추가하는 함수
function add_card_to_col(id){
    const box = document.getElementById("_col_header_"+id);
    const newp = document.createElement('div');
    newp.classList.add("_col_elem_with_input");
    // 카드에 입력받는 상황
    newp.classList.add("editing");

    newp.innerHTML = `<div class="card_contents">
                        <input class="card_contents_title" type='text' placeholder="제목을 입력하세요">
                        <pre><textarea class="card_contents_contents" type='text' placeholder="내용을 입력하세요"></textarea></pre>
                    </div>
                    <div class="add_delete_button_area">
                        <button class="card_delete_button" id="card_delete_button_${id}">삭제</button>
                        <button class="card_add_button" id="card_add_button_${id}">등록</button>
                    </div>`
    
    box.after(newp);

    const card_del_btn = document.getElementById("card_delete_button_" + id);
    const card_add_btn = document.getElementById("card_add_button_" + id);

    card_del_btn.addEventListener('click', (e)=>{del_card_before_register(e)});
    card_add_btn.addEventListener('click', (e)=>{make_new_card(e, id)});
    
    const modal_display = document.getElementById("modal");
    modal_display.remove();
}

// 전체 컬럼을 삭제하는 함수
function delete_column_from_todo_table(id){
    const box = document.getElementById("_col_header_"+id);
    box.parentNode.remove();

    const modal_display = document.getElementById("modal");
    modal_display.remove();
}

// 입력시 삭제가 눌린 경우
function del_card_before_register(e){
    const removed_card = e.target.closest("._col_elem_with_input");
    removed_card.remove();
}

// 입력한 값을 바탕으로 새로운 카드를 생성해주는 함수
function make_new_card(e, id){
    const card_to_delete = e.target.closest("._col_elem_with_input");
    card_to_delete.lastChild.remove();

    const new_button_group_for_new_card = document.createElement("div");
    new_button_group_for_new_card.classList.add("card_button_group");
    
    card_to_delete.append(new_button_group_for_new_card);

    const new_card_contents_location = card_to_delete.childNodes[0];

    const new_title = new_card_contents_location.childNodes[1].value;
    const new_contents = new_card_contents_location.childNodes[3].childNodes[0].value;

    const cur_time = new Date();
    const new_info_to_side_card = new side_menu_card(id, null, new_title, cur_time, "추가");

    side_menu_arr.card_array_push(new_info_to_side_card);

    new_card_contents_location.childNodes[1].remove();
    new_card_contents_location.childNodes[3].remove();
    new_card_contents_location.innerHTML = `<div class="card_contents_title">${new_title}</div>
                                    <pre><div class="card_contents_contents">${new_contents}</div></pre>
                                    <div class="card_contents_author">author by web</div>`

    new_button_group_for_new_card.innerHTML = `<div class="my_button_delete">
                                                    <i class="fa fa-remove"></i>
                                                </div>
                                                <div class="my_button_edit">
                                                    <i class="fa fa-pencil" ></i>
                                                </div>`

    card_to_delete.classList.remove("editing");
    card_to_delete.classList.remove("_col_elem_with_input");
    card_to_delete.classList.add("_col_elem");
    card_to_delete.addEventListener('click', (e)=>{delete_card_in_column(e, id)});
    increase_total_num(id, new_title, new_contents);
}


// 컬럼에서 카드를 삭제하는 함수
function delete_card_in_column(e, id){
    const del_card = e.target.closest("._col_elem");
    if(del_card == null) return;

    const del_title = del_card.childNodes[0].childNodes[0].innerText;
    del_card.remove();

    const cur_time = new Date();
    const new_info_to_side_card = new side_menu_card(id, null, del_title, cur_time, "삭제");

    side_menu_arr.card_array_push(new_info_to_side_card);
    decrease_total_num(id, del_title);
}

function edit_column_name(e){
    const is_column = e.target.closest("._col_header");
    if(is_column == null) return;

    is_column.style.display="none";

    const input_new_col_name = document.createElement("div");
    input_new_col_name.innerHTML = `<input id='enter_new_col_name' type='text' value=${is_column.childNodes[0].innerText}>`
    is_column.after(input_new_col_name);

    document.body.addEventListener('click', (e) => change_col_name(e));
}

function change_col_name(e) {
    const is_changed = document.getElementById("enter_new_col_name");
    const is_in_inputbox = e.target.closest("#enter_new_col_name");
    if(is_changed == null) {
        document.body.removeEventListener('click', (e) => change_col_name(e));
        return;
    }
    else if(is_in_inputbox) return;

    is_changed.parentNode.parentNode.childNodes[0].childNodes[0].innerText = `${is_changed.value}`;
    is_changed.parentNode.parentNode.childNodes[0].style.display = '';
    is_changed.remove();
}