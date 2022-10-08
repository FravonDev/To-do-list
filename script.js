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

    // 1 Método para imprimir
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
    // 2 Método de carregar os dados.
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
    //3 Método para Guardar novos dados

    //FIXME:
    insertNewTask(){
        //pegar o card atual.
        let currentCard = document.querySelector(`#${this.name}`)
        //pegar o form nele
        let form = currentCard.querySelector('.addTask')
        /*quando o form for enviado,
         Pegamos o valor vindo do input text*/
        form.onsubmit = (e)=>{
            e.preventDefault()
            let inputValue = currentCard.querySelector('.addTaskInput').value


           console.log(inputValue)
           console.log(this.tasks)

            //adicionar no array do card.
            this.tasks.push(new Task(false, inputValue));

            //mostrar a nova tarefa na tela
            this.printTask(false, inputValue)
            console.log(this.tasks[this.tasks.length - 1])

            // salvar os dados no localStorage
            localStorage.setItem(`${this.name}`,JSON.stringify(this.tasks))
        }
  
    }
    //4 Métodos secundarios
    validateDescription(description){
        if(typeof description != 'string' || description.trim() == ""){
            //se for invalida, não faça nada.
            return false;
        }
    }

}

//criar os 3 cards 
const shortCard = new Card('shortCard');
const mediumCard = new Card('mediumCard')
const longCard = new Card('longCard')

//carregar os elementos
mediumCard.loadElements()

//testar a função insert new task
mediumCard.insertNewTask()
// criar 2 tasks e adicionar no card





//Quando o form for enviado, pegue os dados.
// document.querySelectorAll('.card').forEach(card => {
//     card.querySelector('.addTask').addEventListener('submit', e => {
//         e.preventDefault() // remover o redirect padrão do form.
//         // pegar e guardar o valor do input

//         let inputValue = card.querySelector('input').value
        
//         console.log('é'+card.id)
//     })
// });

//FIXME:


