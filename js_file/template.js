import {column_element} from "./script.js" 

const todo_status_list = [];

// 상태값들을 원소로 갖는 배열
class todo_elem_list{
    constructor(status){
        this.status = status;
        this.status_elem_list = [];
    }
    
    list_push(new_elem){
        this.status_elem_list.push(new_elem);
    }
    list_pop(del_elem){
        this.status_elem_list.pop(del_elem);
    }
}

class card_elem_list{
    constructor(title, contents){
        this.title = title;
        this.contents = contents;
    }
}

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
    //console.log(1, event.key);
    //console.log(input_box.parentNode.parentNode.parentNode.className);
    if(event.key == "Enter"){
        const new_col_name = input_box.value;
        const deltag = input_box.parentNode;
        deltag.parentNode.setAttribute("id", "_col_header_" + new_col_name);

        deltag.remove();

        const newtag = document.getElementById("_col_header_" + new_col_name);

        newtag.innerHTML = `<h2>${new_col_name}</h2>
                            <div class = "circle">
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

        //newtag.after(newsp);
        make_add_button_active(new_col_name);
        make_delete_button_active(new_col_name);

        const temp = new todo_elem_list(new_col_name);
        todo_status_list.push(temp);

        update_list();
    }
}

// 화면 오른쪽에 기록 화면 추가 -> visable
const show_menu = document.getElementById("top_button");
show_menu.addEventListener('click', menu_visible);

function menu_visible(){
    console.log(1);
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
        const addOption = confirm("항목을 추가할까요?");
        if(addOption) {
            // 항목 추가 //
            add_card_to_col(new_col_name);
        }
    })
}

function make_delete_button_active(new_col_name){
    const del_btn = document.getElementById("del_" + new_col_name);

    del_btn.addEventListener('click', () =>{
        const delOption = confirm("목록을 삭제할까요?");
        if(delOption) {
            // 항목 추가 //
            delete_column_from_todo_table(new_col_name);
        }
    })
}

function add_card_to_col(id){
    //console.log('되는건가?');
    const box = document.getElementById("_col_header_"+id);
    const newp = document.createElement('div');
    newp.classList.add("_col_elem");

    newp.innerHTML = `<h3 id="_elem_header" style="color:blue"><b><input id="card_title" type='text' placeholder="제목을 입력하세요"></b>
                        </h3>
                        <span style="color:skyblue"><input id="card_contents" type='text' placeholder="내용을 입력하세요"></span>
                        <div class="add_delete_button_area">
                        <button class="card_delete_button">삭제</button>
                        <button class="card_add_button">등록</button>
                        </div>`
    box.after(newp);

    const new_card_title = document.getElementById("card_title");
    const new_card_contents = document.getElementById("card_contents");
    // new_card_title.addEventListener('keyup', (event)=> {make_new_card(event, new_card_title)});
    // new_card_contents.addEventListener('keyup', (event)=> {make_new_card(event, new_card_contents)});

    const card_del_btn = document.getElementsByClassName("card_delete_button");
    const card_add_btn = document.getElementsByClassName("card_add_button");
    
    for(var i=0;i<card_del_btn.length;i++){
        card_del_btn[i].addEventListener('click', ()=>{del_card_before_register(new_card_title)});
    }
    for(var i=0;i<card_add_btn.length;i++){
        card_add_btn[i].addEventListener('click', ()=>{make_new_card(new_card_title, new_card_contents)});
    }

}

function delete_column_from_todo_table(id){
    const box = document.getElementById("_col_header_"+id);
    box.parentNode.remove();
}

function del_card_before_register(id){
    id.parentNode.parentNode.parentNode.remove();
}

function make_new_card(title, contents){
    
    console.log(title, contents, title.parentNode);
    const del_button_area = title.parentNode.parentNode.parentNode.lastChild;
    
    del_button_area.remove();


    title.parentNode.innerHTML = `${title.value}`;
    contents.parentNode.innerHTML = `${contents.value}`;

    title.remove();
    contents.remove();
}

function update_list() {
    console.log(todo_status_list.length);
    console.log(todo_status_list[0].status_elem_list);
}
