/* Drag and Drop
1. 카드 위에서 mousedown이벤트가 발생하면 잔상이 남아야된다.
2. 마우스 위치가 이동하면 잔상은 그자리에 있고, 마우스 위치에 따라 카드가 이동해야 된다
    -> 마우스 위치가 일정 지점을 넘어가면 넘어간 쪽의 column으로 카드 위치를 이동
3. mouseup 이벤트가 발생하면 카드를 잔상이 생긴 지점에 넣는다. 
4. 저장된 데이터에 접근해서(선택된 card의 title, contents 이용하고 parents id 이용하면 될듯...?)
5. 이동이 끝나면 우측 메뉴 업데이트 작업
*/


import {side_menu_card, side_menu_arr} from "./side_menu.js"

const todo_table = document.getElementsByClassName("_todo_table")[0];
const remove_drag_from_card = todo_table.getElementsByClassName("_col_elem");

document.body.ondragstart = function(){
  return false;
}

todo_table.addEventListener("mousedown", (e) => {
    const cursoroncard = e.target.closest("._col_elem");
    const is_editing = e.target.closest(".editing");
    const is_remove = e.target.closest(".my_button_delete")

    if (cursoroncard != null && is_editing == null && is_remove==null) {
      const newp = document.createElement("div");
    
      function onMouseMove(e) {

        
        newp.classList.add("_col_elem");
        newp.classList.add("illusion");
        newp.innerHTML = cursoroncard.innerHTML;

        cursoroncard.after(newp);

        let shiftX = e.clientX - e.target.getBoundingClientRect().left;
        let shiftY = e.clientY - e.target.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
          cursoroncard.style.left = pageX - shiftX + 'px';
          cursoroncard.style.top = pageY - shiftY + 'px';
        }
      
        moveAt(e.pageX, e.pageY);

        cursoroncard.classList.add("moving");
        document.body.append(cursoroncard);
        moveAt(e.pageX, e.pageY);
        document.body.style.userSelect='none';
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        const new_location_for_moving_card = elemBelow.closest("._row_elem");
        
        if(new_location_for_moving_card){
          const col_name_of_new_location = new_location_for_moving_card.childNodes[0];
          col_name_of_new_location.insertAdjacentElement("afterend", newp);
        }
      }
    
      document.addEventListener('mousemove', onMouseMove);
    
      function onmouseup() {
        document.removeEventListener('mousemove', onMouseMove);
        cursoroncard.classList.remove("moving");
        // const cur_title = cursoroncard.getElementsByClassName("card_title")[0].innerHTML;
        // const old_col_name = cursoroncard.parentNode.getElementsByClassName
        // console.log(cur_title);
        newp.after(cursoroncard);
        newp.remove();

        //append_to_right_column(cursoroncard);
        cursoroncard.onmouseup = null;
      };

      document.addEventListener('mouseup', onmouseup);
    };
});

