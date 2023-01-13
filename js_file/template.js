import {todo_status_list, todo_elem_list, card_elem_list} from "./script.js" 

//새롭게 생성할 column의 이름을 입력받는 함수
const column_add_button = document.getElementById("#column_add_button");
column_add_button.addEventListener('click', enter_new_column_name)

function enter_new_column_name(){
    const box = document.getElementById("#_todo_table");
    const newp = document.createElement('div');
    newp.classList.add("_row_elem");

    newp.innerHTML = `<div class="_col_header">
                            <h2>
                                <input id="col_name" type='text' placeholder="제목을 입력하세요">
                            </h2>
                        </div>`

    box.appendChild(newp);

    const input_box = document.getElementById("col_name");
    input_box.addEventListener('keyup', (event)=> {make_new_column(event, input_box)});
}

function make_new_column(event, input_box){
    if(event.key == "Enter"){
        const new_col_name = input_box.value;
        const deltag = input_box.parentNode;
        deltag.parentNode.setAttribute("id", "_col_header_" + new_col_name);

        deltag.remove();

        const newtag = document.getElementById("_col_header_" + new_col_name);

        newtag.innerHTML = `<h2>${new_col_name}</h2>
                            <div class = "circle" id ="circle_${new_col_name}">
                                <div class="total_num">
                                    0
                                </div>
                            </div>
                            <div>
                                <button class="my_button_add_list" id="add_${new_col_name}">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button class="my_button_remove_list" id="del_${new_col_name}">
                                    <i class="fa fa-remove"></i>
                                </button>
                            </div>`


        make_add_button_active(new_col_name);
        make_delete_button_active(new_col_name);

        const temp = new todo_elem_list(new_col_name/*status*/);
        todo_status_list.push(temp);

        //update_list();
    }
}

// 화면 오른쪽에 기록 화면 추가 -> visable
const show_menu = document.getElementById("top_button");
show_menu.addEventListener('click', menu_visible);

function menu_visible(){
    let side_menu= document.getElementById("side_bar");

	side_menu.style.visibility = "visible";

    // 오른쪽 메뉴 안보이게 하기
    const close_menu = document.getElementById("menu_close_button");
    close_menu.addEventListener('click', menu_invisible);
}

function menu_invisible(){
    let side_menu= document.getElementById("side_bar");

	side_menu.style.visibility = "hidden";
}

// col_elem(각 리스트 항목) 추가
function make_add_button_active(new_col_name){
    const add_btn = document.getElementById("add_" + new_col_name);

    add_btn.addEventListener('click', () =>{
        show_modal_add(new_col_name);
    })
}

function make_delete_button_active(new_col_name){
    const del_btn = document.getElementById("del_" + new_col_name);

    del_btn.addEventListener('click', () =>{
        show_modal_delete(new_col_name);
    })
}

function show_modal_add(new_col_name){
    const modal_in_display = document.getElementById("#_todo_table");
    const new_modal = document.createElement("section");
    new_modal.id = "modal";
    
    new_modal.innerHTML = `<div id="modal_center">
                                    <span style="font-size:25px; padding-top:50px;">새로운 항목을 등록하시겠습니까?</span>
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

function cancel_action() {
    const modal_display = document.getElementById("modal");
    modal_display.remove();
}
function show_modal_delete(new_col_name){
    const modal_in_display = document.getElementById("#_todo_table");
    const new_modal = document.createElement("section");
    new_modal.id = "modal";
    
    new_modal.innerHTML = `<div id="modal_center">
                                    <span style="font-size:25px; padding-top:50px;">항목을 삭제하시겠습니까?</span>
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
function add_card_to_col(id){
    const box = document.getElementById("_col_header_"+id);
    const newp = document.createElement('div');
    newp.classList.add("_col_elem");

    newp.innerHTML = `<h3 id="_elem_header" style="color:blue"><b><input id="card_title" type='text' placeholder="제목을 입력하세요"></b>
                        </h3>
                        <span style="color:skyblue"><textarea id="card_contents" type='text' placeholder="내용을 입력하세요"></textarea></span>
                        <div class="add_delete_button_area">
                        <button class="card_delete_button" id="card_delete_button_${id}">삭제</button>
                        <button class="card_add_button" id="card_add_button_${id}">등록</button>
                        </div>`
    box.after(newp);

    //update_total_num(id);
    const new_card_title = document.getElementById("card_title");
    const new_card_contents = document.getElementById("card_contents");
    // new_card_title.addEventListener('keyup', (event)=> {make_new_card(event, new_card_title)});
    // new_card_contents.addEventListener('keyup', (event)=> {make_new_card(event, new_card_contents)});

    // const card_del_btn = document.getElementsByClassName("card_delete_button");
    // const card_add_btn = document.getElementsByClassName("card_add_button");
    
    // for(var i=0;i<card_del_btn.length;i++){
    //     card_del_btn[i].addEventListener('click', ()=>{del_card_before_register(new_card_title)});
    // }
    // for(var i=0;i<card_add_btn.length;i++){
    //     card_add_btn[i].addEventListener('click', ()=>{make_new_card(new_card_title, new_card_contents)});
    // }

    const card_del_btn = document.getElementById("card_delete_button_" + id);
    const card_add_btn = document.getElementById("card_add_button_" + id);

    card_del_btn.addEventListener('click', ()=>{del_card_before_register(new_card_title)});
    card_add_btn.addEventListener('click', ()=>{make_new_card(id, new_card_title, new_card_contents)});
    
    const modal_display = document.getElementById("modal");
    modal_display.remove();
}

function delete_column_from_todo_table(id){
    const box = document.getElementById("_col_header_"+id);
    box.parentNode.remove();

    const modal_display = document.getElementById("modal");
    modal_display.remove();
}

function del_card_before_register(id){
    id.parentNode.parentNode.parentNode.remove();
}

function make_new_card(id, title, contents){
    const del_button_area = title.parentNode.parentNode.parentNode.lastChild;
    
    del_button_area.remove();


    title.parentNode.innerHTML = `${title.value}
                                <button class="my_button_delete" id="delete_card_${title.value}">
                                    <i class="fa fa-remove"></i>
                                </button>`;
    contents.parentNode.innerHTML = `${contents.value}`;

    const card_del_button = document.getElementById("delete_card_" + title.value);
    card_del_button.addEventListener('click', ()=>{delete_card_in_column(id, title.value)});
    increase_total_num(id, title, contents);
    update_side_menu_add(id, title, contents);
    title.remove();
    contents.remove();
}

// function update_list() {
//     console.log(todo_status_list.length);
//     console.log(todo_status_list[0].status_elem_list);
// }


function delete_card_in_column(id, value){
    const del_card = document.getElementById("delete_card_" + value);
    del_card.parentNode.parentNode.parentNode.remove();

    update_side_menu_delete(id, value);
    decrease_total_num(id, value);
}

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

function update_side_menu_add(id, title){
    const added_menu = document.getElementById("menu_close_button");

    const new_menu = document.createElement("div");
    new_menu.classList.add("side_card");

    new_menu.innerHTML = `${id}에 ${title.value}를 등록하였습니다`;

    added_menu.after(new_menu);
}

function update_side_menu_delete(id, value) {
    const deleted_menu = document.getElementById("menu_close_button");

    const new_menu = document.createElement("div");
    new_menu.classList.add("side_card");

    new_menu.innerHTML = `${id}에 ${value}를 삭제하였습니다`;

    deleted_menu.after(new_menu);
}