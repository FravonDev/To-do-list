class Card{
    name = 'foo';

    constructor(name){
        this.tasks = [];
        this.name = name
    }
    //criar nova tarefa
    createNewTask(description){
        this.tasks.push(new Task(description));
        
        //Guardando os dados do card Atual, na localStorage como JSON
        localStorage.setItem(this.name,JSON.stringify(this.tasks))

        // ao criar a task, coloque-a na tela

    }

    //método para deletar uma tarefa especifica
    deleteTask(description){
        this.tasks = this.tasks.filter(function(element) { return element.description !== description; });
    }
    // pesquisar e retornar uma tarefa
    queryTask(description){
        console.log(this.tasks.find(task => task.description === description))
    }
    updateTask(){
        //TODO:
    }
    // transformar dados do localStorage do(s) card em elemento HTML
    refreshAllCards(){
        //FIXME:
        console.log('funçãorefresh')
        this.tasks = JSON.parse(localStorage.getItem(this.name))
        console.log(this.tasks)

    }
    


    //metodos secudarios

    
    // método para validar se a string está vazia, tem espaços em branco.
    validateDescription(description){
        if(description.trim() != ""){
            //return is valid
            return true;
        }
    //TODO: Criar um erro quando retornou false
    return false;

    }

    validationsCardObject(inputValue, currentCard){
        // verificar qual card receberá o novo valor
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

        // verificar se o valor é valido.
        let validated = currentCard.validateDescription(inputValue)

        if (validated){
            // crie uma nova task com esta description no card
            currentCard.createNewTask(inputValue)
            currentCard.refreshCards()
        }
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




//Quando o form for enviado, Escutar pelo evento submit em cada form
document.querySelectorAll('.card').forEach(card => {
    card.querySelector('.addTask').addEventListener('submit', e => {
        e.preventDefault() // remover o redirect padrão do form.
        // pegar e guardar o valor do input
        let inputValue = card.querySelector('input').value
        validationsCardObject(inputValue, card)

    })
});

//FIXME:
//atualizar os cards quanto a página for carregada.
[shortCard, mediumCard, longCard].forEach(card => card.refreshCards())
