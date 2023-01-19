fetch("http://localhost:3000/todo_status_list")
.then(response.foreach(item => initial_rendere(item)));

function initial_render(item){
        render_to_window(item);
        // const new_row = document.createElement("div");
        // new_row.classList.add("_row_elem");

        // const todo_table_location = document.getElementsByClassName("_todo_table")[0];
        // todo_table_location.append(new_row);

        // const new_col = document.createElement("div");
        // new_col.classList.add("_col_header");
        // new_col.setAttribute("id", "_col_header_" + entered_new_col_name);
        

        // new_col.innerHTML = `<h2>${entered_new_col_name}</h2>
        //                     <div class = "circle" id ="circle_${entered_new_col_name}">
        //                         <div class="total_num">
        //                             0
        //                         </div>
        //                     </div>
        //                     <div>
        //                         <button class="my_button_add_list" id="add_${entered_new_col_name}">
        //                             <i class="fa fa-plus"></i>
        //                         </button>
        //                         <button class="my_button_remove_list" id="del_${entered_new_col_name}">
        //                             <i class="fa fa-remove"></i>
        //                         </button>
        //                     </div>`

        // new_row.prepend(new_col);

        // make_add_button_active(entered_new_col_name);
        // make_delete_button_active(entered_new_col_name);
}

function render_to_window(data){
    console.log(data);
}