import { make_add_button_active, make_delete_button_active } from "./template.js";

const status_list_addr = "http://localhost:3000/todo_status_list"

fetch(status_list_addr)
.then(response => response.json())
.then((json) => initial_render(json));


function initial_render(item){
    for(let json_idx=0;json_idx<item.length;json_idx++){
        const new_row = document.createElement("div");
        new_row.classList.add("_row_elem");

        const todo_table_location = document.getElementsByClassName("_todo_table")[0];
        todo_table_location.append(new_row);

        const new_col = document.createElement("div");
        new_col.classList.add("_col_header");
        new_col.setAttribute("id", "_col_header_" + item[json_idx].status);
        

        new_col.innerHTML = `<h2>${item[json_idx].status}</h2>
                            <div class = "circle" id ="circle_${item[json_idx].status}">
                                <div class="total_num">
                                    0
                                </div>
                            </div>
                            <div>
                                <button class="my_button_add_list" id="add_${item[json_idx].status}">
                                    <i class="fa fa-plus"></i>
                                </button>
                                <button class="my_button_remove_list" id="del_${item[json_idx].status}">
                                    <i class="fa fa-remove"></i>
                                </button>
                            </div>`

        new_row.append(new_col);

        console.log(item[json_idx].status_elem_list.length);
        if(item[json_idx].status_elem_list.length){
            for(let j=0;j<item[json_idx].status_elem_list.length;j++){
                const new_card = document.createElement("div");
                new_card.classList.add("_col_elem");

                const new_card_contents_location = document.createElement("div");
                new_card_contents_location.classList.add("card_contents");

                const new_button_group_for_new_card = document.createElement("div");
                new_button_group_for_new_card.classList.add("card_button_group");

                new_card_contents_location.innerHTML = `<div class="card_contents_title">${item[json_idx].status_elem_list[j].title}</div>
                                    <pre><div class="card_contents_contents">${item[json_idx].status_elem_list[j].contents}</div></pre>
                                    <div class="card_contents_author">${item[json_idx].status_elem_list[j].author}</div>`

                new_button_group_for_new_card.innerHTML = `<div class="my_button_delete">
                                                    <i class="fa fa-remove"></i>
                                                </div>
                                                <div class="my_button_edit">
                                                    <i class="fa fa-pencil" ></i>
                                                </div>`

                new_card.append(new_card_contents_location);
                new_card.append(new_button_group_for_new_card);

                new_row.append(new_card);
            }
        }
        
        make_add_button_active(item[json_idx].status);
        make_delete_button_active(item[json_idx].status);

        console.log(item[json_idx].status);
    }

    
}
