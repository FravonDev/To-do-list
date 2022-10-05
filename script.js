class Card{
    name = 'foo';



    constructor(name){
        this.tasks = [];
        this.name = name
    }

    createNewTask(status, description ){
        this.tasks.push(new Task(status , description));
        console.log(JSON.stringify(this.tasks))

    }
    deleteTask(description){
        this.tasks = this.tasks.filter(function(element) { return element.description !== description; });
    }
    queryTask(description){
        console.log(this.tasks.find(task => task.description === description))
    }
    changeTask(){
        //todo
    }

    // transformar em elemento HTML
    updateTask(){
    }
}

class Task{
    constructor(status, description ){
        this.status = status
        this.description = description
        // make a unique id
    }
    
}

//criar card 
const shortCard = new Card('short');

shortCard.createNewTask('checked','verify');
shortCard.createNewTask('unchecked','soner blaner');
shortCard.createNewTask('checked','se organizar');





//Quando o form for enviado, Escutar pelo evento submit em cada form
const form = document.querySelectorAll('.addTask').forEach(element => {
    element.addEventListener('submit', e => {
        e.preventDefault() // remover o redirect padrão do form.

        // mostrar o valor do input
        console.log(element.querySelector('input').value)
        // TODO:

        console.log(e)
    console.log('Deu certo')
    })
});
