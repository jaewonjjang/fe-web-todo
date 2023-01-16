const todo_status_list = [];
const date = new Date();

// 상태값들을 원소로 갖는 배열
class todo_elem_list{
    constructor(status){
        this.status = status;
        this.status_elem_list = [];
    }
    
    list_push(new_elem){
        this.status_elem_list.push(new_elem);
    }
    list_pop(del_elem){
        this.status_elem_list.pop(del_elem);
    }
}

class card_elem_list{
    constructor(title, contents){
        this.title = title;
        this.contents = contents;
        this.time = date.getTime();
    }
}

export {todo_status_list, todo_elem_list, card_elem_list};