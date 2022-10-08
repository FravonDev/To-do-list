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

  //métodos

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
    //FIXME:
    // removeButton.setAttribute('onclick', "removeTask(this)")

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

    //TODO::
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

  //FIXME:
  // Método para verificar alterações nos elementos.
  listenForChanges() {
    //pegar o card (elemento html) referente ao objeto card (objeto).
    let currentCard = document.querySelector(`#${this.name}`);

    //remover

    // colocar eventlistener em todos os botoões remover
    currentCard.querySelectorAll(".removeButton").forEach((element) => {
      //quando o botão for clicado
      element.onclick = (event) => {
        //TODO:

        // converter o NodeList em um array e usar o indexOf.
        let array = Array.from(element.parentNode.parentNode.children);
        // guardar o index do elemento.
        const index = array.indexOf(element.parentNode);
        console.log(index);
        // se ja temos o index, vamos remover
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

  // Métodos secundarios
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

//carregar os elementos
mediumCard.loadElements();

mediumCard.insertNewTask();

mediumCard.listenForChanges();

//evento para quando o label for desfocado.
