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

function cancel_action() {
    const modal_display = document.getElementById("modal");
    modal_display.remove();
}