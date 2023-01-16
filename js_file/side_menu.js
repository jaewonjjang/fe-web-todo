class side_menu_card{
    constructor(col_id1, col_id2, new_title/*등록된 카드 혹은 삭제된 카드의 title*/, time/*이벤트가 발생한 시간*/, action){
        this.col_id1 = col_id1;
        this.col_id2 = col_id2;
        this.new_title = new_title;
        this.time = time;
        this.action = action;
    };
}

class menu_card_array {
    constructor(){
        this.card_array = [];
    }
    card_array_push(item){
        this.card_array.push(item);
    }
    card_array_pop(){
        this.card_array.pop();
    }
};

const side_menu_arr = new menu_card_array();

// 화면 오른쪽에 기록 화면 추가 -> visable
const show_menu = document.getElementById("top_button");
show_menu.addEventListener('click', menu_visible);

function menu_visible(){
    let side_menu= document.getElementById("side_bar");

	side_menu.style.visibility = "visible";

    // 오른쪽 메뉴 안보이게 하기
    const close_menu = document.getElementById("menu_close_button");
    close_menu.addEventListener('click', menu_invisible);

    update_side_menu(close_menu);
}

function menu_invisible(){
    let side_menu= document.getElementById("side_bar");
	side_menu.style.visibility = "hidden";
}

side_menu_card.prototype.update_side_menu_add = function(id, title) {
    
    const added_menu = document.getElementById("menu_close_button");

    const new_menu = document.createElement("div");
    new_menu.classList.add("side_card");

    new_menu.innerHTML = `<div class="side_card">
                                <div class="side_card_imoji">
                                    &#128129
                                </div>
                                <div class="side_card_contents">
                                    <div class="contents_author" style="font-size:13px">
                                        @jaewon
                                    </div>
                                    <div class="contents_title" style="font-size:15px">
                                    ${id}에 ${title.value}를 등록하였습니다
                                    </div>
                                    <div class="contents_time" style="font-size:12px">
                                        1분전
                                    </div>
                                </div>
                            </div>`;
  
    added_menu.after(new_menu);
}

side_menu_card.prototype.update_side_menu_add = function(id, value) {
    const deleted_menu = document.getElementById("menu_close_button");

    const new_menu = document.createElement("div");
    new_menu.classList.add("side_card");

    new_menu.innerHTML = `<div class="side_card">
                                <div class="side_card_imoji">
                                    &#128129
                                </div>
                                <div class="side_card_contents">
                                    <div class="contents_author" style="font-size:13px">
                                        @jaewon
                                    </div>
                                    <div class="contents_title" style="font-size:15px">
                                        ${id}에 ${value}를 삭제하였습니다
                                    </div>
                                    <div class="contents_time" style="font-size:12px">
                                        1분전
                                    </div>
                                </div>
                            </div>`;

    deleted_menu.after(new_menu);
   
}

function update_side_menu(close_menu){
    const date = new Date();

    console.log(side_menu_arr.card_array.length);
    
    for(let i=0;i<side_menu_arr.card_array.length;i++){
        const newp = document.createElement("div");
        newp.className = "side_card";
        newp.innerHTML = `<div class="side_card_imoji">&#128129</div>
                                <div class="side_card_contents">
                                    <div class="contents_author" style="font-size:13px">
                                        @jaewon
                                    </div>
                                    <div class="contents_title" style="font-size:15px">
                                        ${side_menu_arr.card_array[i].col_id1}에 ${side_menu_arr.card_array[i].new_title}을 등록하였습니다
                                    </div>
                                    <div class="contents_time" style="font-size:12px">
                                        시간 계산
                                    </div>
                                </div>`;
        close_menu.after(newp);
    }
}

export {/*update_side_menu_add, update_side_menu_delete,*/ side_menu_card, side_menu_arr};