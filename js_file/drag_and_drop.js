/* Drag and Drop
1. 카드 위에서 mousedown이벤트가 발생하면 잔상이 남아야된다.
2. 마우스 위치가 이동하면 잔상은 그자리에 있고, 마우스 위치에 따라 카드가 이동해야 된다
    -> 마우스 위치가 일정 지점을 넘어가면 넘어간 쪽의 column으로 카드 위치를 이동
3. mouseup 이벤트가 발생하면 카드를 잔상이 생긴 지점에 넣는다. 
4. 저장된 데이터에 접근해서(선택된 card의 title, contents 이용하고 parents id 이용하면 될듯...?)
5. 이동이 끝나면 우측 메뉴 업데이트 작업
*/

const todo_table = document.getElementsByClassName("_todo_table")[0];

todo_table.addEventListener("mousedown", (e) => {
    const cursoroncard = e.target.closest("._col_elem");
    if (cursoroncard != null) {
      alert("jaewon");
    }
});


// const moveContainer = (e) => {
//   if (!e.target.classList.contains("item")) return;
//   let shiftX = e.clientX - e.target.getBoundingClientRect().left;
//   let shiftY = e.clientY - e.target.getBoundingClientRect().top;

//   e.target.style.position = 'absolute';
//   e.target.style.zIndex = 1000;
//   section.append(e.target);

//   moveAt(e.pageX, e.pageY);

//   function moveAt(pageX, pageY) {
//     e.target.style.left = pageX - shiftX + 'px';
//     e.target.style.top = pageY - shiftY + 'px';
//   }


//   function onMouseMove(event) {

//     moveAt(event.pageX, event.pageY);

//     e.target.hidden = true;
//     let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//     e.target.hidden = false;

//     if (!elemBelow) return;

//     let droppableBelow = elemBelow.closest('.droppable');
//     if (currentDroppable != droppableBelow) {
//       if (currentDroppable) {
//         leaveDroppable(currentDroppable);

//       }
//       currentDroppable = droppableBelow;
//       if (currentDroppable) {
//         enterDroppable(currentDroppable);
//         appendSideElement(e.target, droppableBelow);


//       }
//     }
//   }

//   document.addEventListener('mousemove', onMouseMove);

//   e.target.onmouseup = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//     e.target.onmouseup = null;
//   };

// };

// function enterDroppable(elem) {
//   elem.style.borderColor = 'blue';
// }

// function appendSideElement(elem, target) {
//   const temp = elem;
//   temp.style = "";
//   temp.style.transition = 'transition: all 3s linear;';
//   temp.className = "mini";
//   elem.remove();
//   target.append(temp);
// }

// function appendMainElement(elem) {
//   elem.className = "mini";
//   side.append(elem);

// }

// function leaveDroppable(elem) {
//   elem.style.background = '';
// }

// con.ondragstart = function () {
//   return false;
// };

// con.addEventListener('mousedown', moveContainer);