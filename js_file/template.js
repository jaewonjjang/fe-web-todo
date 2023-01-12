import {column_element} from "./script.js" 

//새롭게 생성할 column의 이름을 입력받는 함수
const column_add_button = document.getElementById("#column_add_button");
column_add_button.addEventListener('click', enter_new_column_name)


function enter_new_column_name(){
    const box = document.getElementById("#_todo_table");
    const newp = document.createElement('div');

    newp.innerHTML = `<div class="_row_elem" id="_row_elem_done">
                            <div class="_col_header" id="_col_header_done">
                                <h2>
                                    <input id="name" type='text' placeholder="제목을 입력하세요">
                                </h2>
                            </div>
                        </div>`

    box.appendChild(newp);

    const input_box = document.getElementById("name");
    input_box.addEventListener('keyup', (event)=> {make_new_column(event, input_box)});
}



function make_new_column(event, input_box){
    console.log(1, event.key);
    if(event.key == "Enter"){
        const new_col_name = input_box.value;
        const newtag = input_box.parentNode;
        const newsp = document.createElement("span");
        input_box.remove();

        newsp.innerHTML = `<div class="_col_header" id="_col_header_todo">
                                <h2>${new_col_name}</h2>
                                <div class = "circle">
                                    <div class="total_num">
                                        0
                                    </div>
                                </div>
                                <div>
                                    <button class="my_button_add_list" id="todo">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                    <button class="my_button_remove_list" id="todo">
                                        <i class="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>`

        newtag.appendChild(newsp);

        new column_element(new_col_name);
    }

}
