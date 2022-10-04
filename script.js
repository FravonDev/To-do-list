class Card{
    name = 'foo';

    constructor(name){
        this.tasks = [];
        this.name = name
    }

    createNewTask(status, description){
        this.tasks.push(new Task(status , description));
        // this.tasks.forEach((item) => {
        //     item.id = this.task.lenghgt;
        //   });
        // receiveId(
        //     this.tasks.forEach(e => this.id = i++)
        // )
    }
    deleteTask(description){
        this.tasks = this.tasks.filter(function(element) { return element.description !== description; });

    }
    queryTask(description){
        console.log(this.tasks.find(task => task.description === description))

    }
    updateTask(){
        //todo
    }
}

class Task{
    constructor(status, description){
        this.status = status
        this.description = description
        // make a unique id
    }
}



//create a card
const shortCard = new Card('short');

shortCard.createNewTask('checked','verify');
shortCard.createNewTask('checked','soner blaner');
shortCard.createNewTask('checked','se organizar');



shortCard.deleteTask('soner blaner');
console.log(shortCard)




