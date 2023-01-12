export default function card_addition(){
    const box = document.getElementById("#_todo_table");
 		const newp = document.createElement('div');

		newp.innerHTML = `<div class="_row_elem" id="_row_elem_done">
								<div class="_col_header" id="_col_header_done">
									<h2>완료한 일</h2>
									<div class = "circle">
										<div class="total_num">
											0
										</div>
									</div>
									<div>
										<button class="my_button_add_list" id="done">
											<i class="fa fa-plus"></i>
										</button>
										<button class="my_button_remove_list" id="done">
											<i class="fa fa-remove"></i>
										</button>
									</div>
								</div>
							</div>
						</div>`

		box.appendChild(newp);
}

