class Card{
    name = 'foo';

    constructor(name){
        this.tasks = [];
        this.name = name
    }

    createNewTask(description){
        this.tasks.push(new Task(description));
        console.log(JSON.stringify(this.tasks))

    }
    // função para validar se a string está vazia, tem espaços em branco.
    validateDescription(description){
            if(description.trim() != ""){
                //TODO:
                console.log(description)
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
    changeTask(){
        //TODO:
    }
    // transformar em elemento HTML
    updateTask(){
        //TODO:
    }
}

class Task{
    constructor(description ){
        this.status = false
        this.description = description
        // make a unique id
    }
    
}

//criar card 
const shortCard = new Card('shortCard');

shortCard.createNewTask('checked','verify');
shortCard.createNewTask('unchecked','soner blaner');
shortCard.createNewTask('checked','se organizar');


console.log(shortCard)


//Quando o form for enviado, Escutar pelo evento submit em cada form
const form = document.querySelectorAll('.addTask').forEach(element => {
    element.addEventListener('submit', e => {
        e.preventDefault() // remover o redirect padrão do form.
        
        console.log('pegamos dados do form')

        //TODO: pegar o card atual, que está sendo utilizado.

        // pegar e guardar o valor do input
        let inputValue = element.querySelector('input').value

        // verificar se o valor é valido.
        let validated = shortCard.validateDescription(inputValue)
        // TODO: inser
        if (validated){
            // crie uma nova task com esta description no card
            shortCard.createNewTask(inputValue)
        }

    })
});
