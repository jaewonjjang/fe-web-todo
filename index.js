class Column {
    constructor(id, name, cards = []) {
        this.id = id;
        this.name = name;
        this.cards = cards;
    }
}

class Card {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}
class Model {
    constructor(initialState) {
        this.state = initialState;
        this.subscriptions = [];
    }

    subscribe(subscriptionFn) {
        this.subscriptions.push(subscriptionFn);
    }

    notify() {
        this.subscriptions.forEach(subscriptionFn => subscriptionFn(this.state));
    }

    addColumn(column) {
        this.state = {
            ...this.state,
            columns: [...this.state.columns, column]
        };
        this.notify();
    }

    addCard(columnId, card) {
        const column = this.state.columns.find(col => col.id === columnId);
        column.cards = [...column.cards, card];
        this.notify();
    }

    editCard(cardId, text) {
        const card = this.state.columns.find(col => col.cards.find(c => c.id === cardId));
        card.text = text;
        this.notify();
    }

    deleteCard(columnId, cardId) {
        const cards = this.state.columns.find(col => col.id === columnId).cards;
        const updatedCards = cards.filter(c => c.id !== cardId);
        this.state.columns.find(col => col.id === columnId).cards = updatedCards;
        this.notify();
    }

    modifyColumn(columnId, name) {
        this.state.columns.find(col => col.id === columnId).name = name;
        this.notify();
    }
}

class View {
    constructor(model, elements) {
        this.model = model;
        this.elements = elements;
        this.model.subscribe(this.render.bind(this));
        this.init();
    }

    init() {
        this.elements.addColumnForm.addEventListener('submit', this.handleAddColumn.bind(this));
        this.elements.addCardForm.addEventListener('submit', this.handleAddCard.bind(this));
        this.render(this.model.state);
    }

    handleAddColumn(e) {
        e.preventDefault();
        const columnName = e.target.elements.columnName.value;
        const column = { id: Date.now(), name: columnName, cards: [] };
        this.model.addColumn(column);
    }

    handleAddCard(e) {
        e.preventDefault();
        const cardText = e.target.elements.cardText.value;
        const columnId = e.target.elements.columnId.value;
        const card = { id: Date.now(), text: cardText };
        this.model.addCard(columnId, card);
    }

    render(state) {
        state.columns.forEach(column => {
            const columnEl = this.elements.columns.querySelector(`#${column.id}`);
            const cardsEl = columnEl.querySelector('.cards');
            cardsEl.innerHTML = "";

            column.cards.forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.classList.add('card');
                cardEl.innerHTML = card.text;
                cardEl.id = card.id;
                cardsEl.appendChild(cardEl);

                // Add draggable functionality to each card
                cardEl.addEventListener('mousedown', e => {
                    this.isDragging = true;
                    this.offset = { x: e.clientX - cardEl.offsetLeft, y: e.clientY - cardEl.offsetTop };
                    cardEl.style.position = 'absolute';
                    cardEl.style.zIndex = 1000;
                    document.body.appendChild(cardEl);
                });

                // Add draggable functionality to each card
                cardEl.addEventListener('mouseup', e => {
                    this.isDragging = false;
                    cardEl.style.position = 'relative';
                    cardEl.style.zIndex = 0;
                    const x = e.clientX - this.offset.x;
                    const y = e.clientY - this.offset.y;
                    const newColumnId = this.getDroppableColumnId(x, y);
                    if (newColumnId) {
                        const columnId = column.id;
                        const cardId = card.id;
                        this.model.moveCard(columnId, cardId, newColumnId);
                    }
                });

                // Add draggable functionality to each card
                document.addEventListener('mousemove', e => {
                    if (this.isDragging) {
                        cardEl.style.left = e.clientX - this.offset.x + 'px';
                        cardEl.style.top = e.clientY - this.offset.y + 'px';
                    }
                });
            });

            // Add droppable functionality to each column
            columnEl.addEventListener('mouseup', e => {
                if (this.isDragging) {
                    const x = e.clientX;
                    const y = e.clientY;
                    const newColumnId = this.getDroppableColumnId(x, y);
                    if (newColumnId) {
                        const columnId = column.id;
                        const cardId = this.getDraggedCardId();
                        this.model.moveCard(columnId, cardId, newColumnId);
                    }
                }
            });
        });
    }

    // Helper function to get the id of the droppable column
    getDroppableColumnId(x, y) {
        const columnEls = this.elements.columns.querySelectorAll('.column');
        for (let i = 0; i < columnEls.length; i++) {
            const columnEl = columnEls[i];
            if (x > columnEl.offsetLeft && x < columnEl.offsetLeft + columnEl.offsetWidth &&
                y > columnEl.offsetTop && y < columnEl.offsetTop + columnEl.offsetHeight) {
                return columnEl.id;
            }
        }
    }

    // Helper function to get the id of the dragged card
    getDraggedCardId() {
        const cardEls = this.elements.columns.querySelectorAll('.card');
        for (let i = 0; i < cardEls.length; i++) {
            const cardEl = cardEls[i];
            if (cardEl.style.position === 'absolute') {
                return cardEl.id;
            }
        }
    }
}

const model = new Model({ columns: [] });
const view = new View(model, {
    columns: document.getElementById('columns'),
    addColumnForm: document.getElementById('add-column-form'),
    addCardForm: document.getElementById('add-card-form'),
});



