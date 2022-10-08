// Criar a classe Tasks, que são nossas tarefas.
class Task {
  constructor(status, description) {
    this.status = status;
    this.description = description;
  }
}

//criar a classe card, que é onde ficam nossas tarefas
class Card {
  name;
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  // 1 Método para imprimir
  printTask(status, description) {
    // validar se a descrição é valida.
    if (this.validateDescription(description) == false) {
      // se for inválida, interrompa a execução do método
      return false;
    }

    // criar e adicionar valores no checkbox.
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = status;

    // criar e adicionar valores na label
    let label = document.createElement("label");
    label.setAttribute("contentEditable", "true");
    label.innerText = description;

    //criar um botão para remover uma tarefa.
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "removeButton");

    //criar uma div para agrupar o checkbox e na label.
    let groupTaskElements = document.createElement("div");
    //adicionar classe
    groupTaskElements.setAttribute("class", "taskGroup");

    //inserir os elementos na div
    groupTaskElements.append(checkbox);
    groupTaskElements.append(label);
    groupTaskElements.append(removeButton);

    /* adicionar os valores em seu respectivo cardHTML, vamos usar o nome do objeto card */
    let cardElement = document.querySelector(`#${this.name}`);
    cardElement = cardElement.querySelector(".tasks");
    cardElement.append(groupTaskElements);

    //TODO:
    /* depois que colocar os elementos na tela, atualize os dados da localStorage para eliminar
        dados em brancos criados pela edição da tarefa
        para espaço em branco ou tarefa vazia */
  }
  // 2 Método de carregar os dados.
  loadElements() {
    // pegue as tasks que etão guardadas no localStorage
    let tasks = localStorage.getItem(`${this.name}`);
    /* se não tiver nenhuma tarefa,
         nao tem o que ser carregado, então pare a execução. */
    if (!tasks) {
      return false;
    }
    // guarde essas tasks no seu respectivo card.
    tasks = JSON.parse(tasks);
    this.tasks = tasks;

    //adicione cada elemento na tela.
    this.tasks.forEach((task) => this.printTask(task.status, task.description));
  }
  //3 Método para Guardar novos dados
  insertNewTask() {
    //pegar o card atual.
    let currentCard = document.querySelector(`#${this.name}`);
    //pegar o form nele
    let form = currentCard.querySelector(".addTask");
    /*quando o form for enviado,
         Pegamos o valor vindo do input text*/
    form.onsubmit = (e) => {
      e.preventDefault();
      let inputValue = currentCard.querySelector(".addTaskInput").value;

      console.log(inputValue);
      console.log(this.tasks);

      //adicionar no array do card.
      this.tasks.push(new Task(false, inputValue));

      //mostrar a nova tarefa na tela
      this.printTask(false, inputValue);
      console.log(this.tasks[this.tasks.length - 1]);

      // salvar os dados no localStorage
      localStorage.setItem(`${this.name}`, JSON.stringify(this.tasks));
    };
  }

//Método para atualizar
updateTask(index, element) {
  let tasks = JSON.parse(localStorage.getItem(`${this.name}`));
  
  //FIXME:
  // se a task 1 estiver vazia.
  if (tasks[0].description == undefined){
    tasks.splice(0,1)
  }

  tasks[index].status = element.querySelector('input').checked
  tasks[index].description = element.querySelector('label').innerText
  this.tasks = tasks;

  // atualizar localstorage
  localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
  localStorage.setItem(JSON.stringify(`${this.name}`), tasks)

}
  // Método para verificar alterações nos elementos.
  listenForChanges() {
  //TODO:
    //pegar o card (elemento html) referente ao objeto card (objeto).
    let currentCard = document.querySelector(`#${this.name}`);
    console.log(`e isso ai`)

    //escutar por alteração no checkbox.
    currentCard.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.onclick = (event) => {

        let array = Array.from(checkbox.parentNode.parentNode.children);
        const index = array.indexOf(checkbox.parentNode);
        this.updateTask(index, checkbox.parentNode);
      };
    });

     //escutar por alteração no checkbox.
     currentCard.querySelectorAll('label').forEach((label) => {
      label.onblur = (event) => {

        let array = Array.from(label.parentNode.parentNode.children);
        const index = array.indexOf(label.parentNode);
        console.log(index);
        console.log(this)
        this.updateTask(index, label.parentNode);
      };
    });

    currentCard = document.querySelector(`#${this.name}`);

    // Remover elementos
    currentCard.querySelectorAll(".removeButton").forEach((element) => {
      element.onclick = (event) => {
        let array = Array.from(element.parentNode.parentNode.children);
        const index = array.indexOf(element.parentNode);
        console.log(index);
        this.removeTask(index, element);
      };
    });
  }

  //Método para remover tarefas
  removeTask(index, element) {
    console.log(index, element, this);

    //pegar tasks armazenadas e converte-las
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));

    tasks.splice(index, 1);

    // atualizar localstorage
    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    //atualizar no array do objeto
    this.tasks = tasks;

    //remover da tela
    console.log(element.parentNode.remove());

    //após remover escutar por novos eventos
    this.listenForChanges;
  }

  //2.1 validar descrição
  validateDescription(description) {
    if (typeof description != "string" || description.trim() == "") {
      //se for invalida, não faça nada.
      return false;
    }
  }
  // função para atualizar o localstorage
  refreshStorage() {
    localStorage.setItem(
      localStorage.setItem(this.name, JSON.stringify(this.tasks))
    );
  }
}

//criar os 3 cards
const shortCard = new Card("shortCard");
const mediumCard = new Card("mediumCard");
const longCard = new Card("longCard");

//habilitar todos métodos dos objetos
[shortCard, mediumCard, longCard].forEach(card => {
  card.loadElements();
  card.insertNewTask();
  card.listenForChanges();

})

