// Criar a classe Tasks, que são nossas tarefas.
class Task{
    constructor(status, description){
        this.status = status
        this.description = description
    }
}

//criar a classe card, que é onde ficam nossas tarefas
class Card{
    name;
    tasks = []

    constructor(name){
        this.name = name
    }

    //métodos

    // Método para imprimir
    printTask(status, description){
        // validar se a descrição é valida.
        if (this.validateDescription(description) == false){
            // se for inválida, interrompa a execução do método
            return false
        }
        
        // criar e adicionar valores no checkbox .
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = status
            
        // criar e adicionar valores na label
        let label = document.createElement('label')
        label.innerText = description;
        
        //criar uma div para agrupar o checkbox e na label.
        let groupTaskElements = document.createElement('div');

        groupTaskElements.append(checkbox)
        groupTaskElements.append(label)

        /* adicionar os valores em seu respectivo cardHTML, vamos usar o nome do objeto card */
        let cardElement  = document.querySelector(`#${this.name}`)
        cardElement = cardElement.querySelector('.tasks');
        cardElement.append(groupTaskElements)
        
        //FIXME:
        /* depois que colocar os elementos na tela, atualize os dados da localStorage para eliminar
        dados em brancos criados pela edição da tarefa
        para espaço em branco ou tarefa vazia */
    }
    // método de carregar os dados.
    loadElements(){
        // pegue as tasks que etão guardadas no localStorage
        let tasks = localStorage.getItem(`${this.name}`)
        // guarde essas tasks no seu respectivo card.
        tasks = JSON.parse(tasks)
        this.tasks = tasks

        //adicione cada elemento na tela.
        this.tasks.forEach(task => this.printTask(
            task.status, task.description))
    }
    
    //métodos secundarios
    validateDescription(description){
        console.log('ta validando')
        if(typeof description != 'string' || description.trim() == ""){
            //se for invalida, não faça nada.
            console.log('Descrição invalida')
            return false;
        }
    }

}

let mediumCard = new Card('mediumCard')
// adicionar valores pra serem adicionar quando a pagina carregar.
let task1 = new Task(true, "Dojyaaan")
let task2 = new Task(false, "Dirt Deeds Done Dirt Cheap")
let task3 = new Task(true, "BANKAI!!!")
let task4 = new Task(true, "")
let task5 = new Task(true, "zenbonsakura kageyoshi")

let takers = [task1, task2, task3, task4, task5]
localStorage.setItem('mediumCard', JSON.stringify(takers))
mediumCard.loadElements()


// criar 2 tasks e adicionar no card



