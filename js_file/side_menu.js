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

	side_menu.style.display = "block";

    // 오른쪽 메뉴 안보이게 하기
    const close_menu = document.getElementById("menu_close_button");
    close_menu.addEventListener('click', menu_invisible);

    update_side_menu(close_menu);
}

function menu_invisible(){
    let side_menu= document.getElementById("side_bar");
	side_menu.style.display = "none";
}

function update_side_menu(close_menu){

    flush_prev_menu();

    let date = new Date();

    for(let i=0;i<side_menu_arr.card_array.length;i++){
        if(side_menu_arr.card_array[i].action == "추가"){
            let time_collaps = time_collap_for_new_card(date, side_menu_arr.card_array[i].time)
            let newp = document.createElement("div");
            newp.className = "side_card";
            newp.innerHTML = '';
            newp.innerHTML = `<div class="side_card_imoji">&#128129</div>
                                <div class="side_card_contents">
                                    <div class="contents_author">
                                        @jaewon
                                    </div>
                                    <div class="contents_title">
                                        <b>${side_menu_arr.card_array[i].col_id1}</b>에 <b>${side_menu_arr.card_array[i].new_title}</b>을 <b>등록</b>하였습니다
                                    </div>
                                    <div class="contents_time">
                                        ${time_collaps}전
                                    </div>
                                </div>`;
            close_menu.after(newp);
        }
        else if(side_menu_arr.card_array[i].action == "삭제"){
            let time_collaps = time_collap_for_new_card(date, side_menu_arr.card_array[i].time)
            let newp = document.createElement("div");
            newp.className = "side_card";
            newp.innerHTML = '';
            newp.innerHTML = `<div class="side_card_imoji">&#128129</div>
                                <div class="side_card_contents">
                                    <div class="contents_author">
                                        @jaewon
                                    </div>
                                    <div class="contents_title">
                                    <b>${side_menu_arr.card_array[i].col_id1}</b>에서 <b>${side_menu_arr.card_array[i].new_title}</b>을 <b>삭제</b>하였습니다
                                    </div>
                                    <div class="contents_time">
                                        ${time_collaps}전
                                    </div>
                                </div>`;
            close_menu.after(newp);
        }
        else if(side_menu_arr.card_array[i].action == "이동"){
            let time_collaps = time_collap_for_new_card(date, side_menu_arr.card_array[i].time)
            let newp = document.createElement("div");
            newp.className = "side_card";
            newp.innerHTML = '';
            newp.innerHTML = `<div class="side_card_imoji">&#128129</div>
                                <div class="side_card_contents">
                                    <div class="contents_author">
                                        @jaewon
                                    </div>
                                    <div class="contents_title">
                                        <b>${side_menu_arr.card_array[i].col_id1}</b>에서 <b>${side_menu_arr.card_array[i].col_id2}</b>로 <b>${side_menu_arr.card_array[i].new_title}</b>가 <b>이동</b>하였습니다
                                    </div>
                                    <div class="contents_time">
                                        ${time_collaps}전
                                    </div>
                                </div>`;
            close_menu.after(newp);
        }
        else return;
    }
}

function flush_prev_menu(){
    const prev_cards = document.getElementsByClassName("side_card");
    while(prev_cards.length){
        prev_cards[0].remove();
    }
}
function time_collap_for_new_card(cur_time, card_time){
    const time_diff = (cur_time.getTime() - card_time.getTime()) / 60000;

    if(time_diff < 1) return "방금";
    else return Math.floor(time_diff)+"분"; 
}
export {side_menu_card, side_menu_arr};