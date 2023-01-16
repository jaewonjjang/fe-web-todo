const contents_box_area = document.getElementsByClassName("_todo_table")[0];

contents_box_area.addEventListener('input', (e) => {
    const inputarea = e.target.closest('#card_contents');
    console.log("jaewon");
    if(inputarea != null){
        contents_box_adjust(inputarea);
    }
})


function contents_box_adjust(inputarea){
    // const CardButton = inputarea.closest('.NewCard').getElementsByClassName('CardRegister')[0];

    // if(inputarea.value.trim().length > 0){
    //     CardButton.disabled = false;
    // }
    // else{
    //     CardButton.disabled = true;
    // }

    inputarea.style.height = '1px';
    inputarea.style.height = (24 + inputarea.scrollHeight) + 'px';
}