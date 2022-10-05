class Card{
    name = 'foo';

    constructor(name){
        this.tasks = [];
        this.name = name
    }

    createNewTask(description){
        this.tasks.push(new Task(description));
                
        //Guardando os dados do card Atual, na localStorage como JSON
        localStorage.setItem(this.name,JSON.stringify(this.tasks))

        console.log(JSON.stringify(this.tasks))
    }
    // função para validar se a string está vazia, tem espaços em branco.
    validateDescription(description){
            if(description.trim() != ""){
                //return is valid
                return true;
            }
        //TODO: Criar um erro quando retornou false
        return false;

    }
    deleteTask(description){
        this.tasks = this.tasks.filter(function(element) { return element.description !== description; });
    }
    queryTask(description){
        console.log(this.tasks.find(task => task.description === description))
    }
    updateTask(){
        //TODO:
    }
    // transformar em elemento HTML
    refreshCards(){
        //TODO:
        this.tasks = JSON.parse(localStorage.getItem(this.name))

    }
}

class Task{
    constructor(description ){
        this.status = false
        this.description = description
    }
}
//criar os 3 cards 
const shortCard = new Card('shortCard');
const mediumCard = new Card('mediumCard')
const longCard = new Card('longCard')


shortCard.refreshCards()

//Quando o form for enviado, Escutar pelo evento submit em cada form
document.querySelectorAll('.card').forEach(card => {
    card.querySelector('.addTask').addEventListener('submit', e => {
        e.preventDefault() // remover o redirect padrão do form.
        //TODO: pegar o card atual, que está sendo utilizado.
        // pegar e guardar o valor do input
        let inputValue = card.querySelector('input').value

        validationsCardObject(inputValue, card)

    })
});



function validationsCardObject(inputValue, currentCard){
    switch(currentCard.id){
        case shortCard.name:
            currentCard = shortCard
            break;
        case mediumCard.name:
            currentCard = mediumCard
            break;
        case longCard.name:
            currentCard = longCard
            break;
    }


    console.log(currentCard)

    // verificar se o valor é valido.
    let validated = currentCard.validateDescription(inputValue)

    if (validated){
        // crie uma nova task com esta description no card
        currentCard.createNewTask(inputValue)
        currentCard.refreshCards()
    }
}