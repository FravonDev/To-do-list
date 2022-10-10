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
    this.loadMethods()

  }
  loadMethods(){
    this.loadElements();
    this.insertNewTask();
    this.listenForChanges();
  }
  // 1 Método para imprimir
  printTask(status, description) {
    if (this.validateDescription(description) == false) {
      return false;
    }

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = status;

    let label = document.createElement("label");
    label.setAttribute("contentEditable", "true");
    label.innerText = description;

    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "removeButton");

    let groupTaskElements = document.createElement("div");
    groupTaskElements.setAttribute("class", "taskGroup");
    groupTaskElements.setAttribute("draggable", "true");
    groupTaskElements.addEventListener("mouseover", function(){
      
      this.prototype.dragAndDrop();

   }.bind(Card))

    groupTaskElements.append(checkbox);
    groupTaskElements.append(label);
    groupTaskElements.append(removeButton);

    /* adicionar os valores em seu respectivo cardHTML, vamos usar o nome do objeto card */
    let cardElement = document.querySelector(`#${this.name}`);
    cardElement = cardElement.querySelector(".tasks");
    cardElement.append(groupTaskElements);
  }
  // 2 Método de carregar os dados.
  loadElements() {
    let tasks = localStorage.getItem(`${this.name}`);
    if (!tasks) {
      return false;
    }
    tasks = JSON.parse(tasks);
    this.tasks = tasks;

    this.tasks.forEach((task) => this.printTask(task.status, task.description));
  }
  //3 Método para Guardar novos dados
  insertNewTask() {
    let currentCard = document.querySelector(`#${this.name}`);
    let form = currentCard.querySelector(".addTask");
    form.onsubmit = (e) => {
      e.preventDefault();
      let inputValue = currentCard.querySelector(".addTaskInput").value;
      this.tasks.push(new Task(false, inputValue));
      currentCard.querySelector("form").reset();

      this.printTask(false, inputValue);
      localStorage.setItem(`${this.name}`, JSON.stringify(this.tasks));
      this.listenForChanges();
    };
  }
  //Método para atualizar
  updateTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));

    if (tasks[0].description == undefined) {
      tasks.splice(0, 1);
    }

    tasks[index].status = element.querySelector("input").checked;
    tasks[index].description = element.querySelector("label").innerText;
    this.tasks = tasks;

    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    localStorage.setItem(JSON.stringify(`${this.name}`), tasks);
  }
  // Método para verificar alterações nos elementos.
  listenForChanges() {
    let currentCard = document.querySelector(`#${this.name}`);
    console.log(`e isso ai`);

    currentCard
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.onclick = () => {
          let array = Array.from(checkbox.parentNode.parentNode.children);
          const index = array.indexOf(checkbox.parentNode);
          this.updateTask(index, checkbox.parentNode);
        };
      });

    currentCard.querySelectorAll("label").forEach((label) => {
      label.onblur = () => {
        let array = Array.from(label.parentNode.parentNode.children);
        const index = array.indexOf(label.parentNode);
        console.log(index);
        console.log(this);
        this.updateTask(index, label.parentNode);
      };
    });

    currentCard = document.querySelector(`#${this.name}`);

    currentCard.querySelectorAll(".removeButton").forEach((element) => {
      element.onclick = () => {
        let array = Array.from(element.parentNode.parentNode.children);
        const index = array.indexOf(element.parentNode);
        console.log(index);
        this.removeTask(index, element);
      };
    });
  }
  removeTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));
    tasks.splice(index, 1);
    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    this.tasks = tasks;
    console.log(element.parentNode.remove());
  }
  // validar descrição
  validateDescription(description) {
    if (typeof description != "string" || description.trim() == "") {
      return false;
    }
  }
  // método para atualizar o localstorage
  refreshStorage() {
    //TODO:
    console.log('lets save')

  }


  // método para arrastar e soltar as tarefas.
  dragAndDrop() {
    let cards = document.querySelectorAll(".taskGroup");
    let tasks = document.querySelectorAll(".tasks");

    cards.forEach((card) => {
      console.log(card);
      card.addEventListener("dragstart", function () {
        tasks.forEach((task) => task.classList.add("highlight"));
        console.log("Peguei ",this);
        this.classList.add("dragging");
      });

      card.addEventListener("dragend", function () {
        tasks.forEach((task) => task.classList.remove("highlight"));
        this.classList.remove("dragging");
        console.log('HAHAHHAHAH');
      });
    });

    tasks.forEach((task) => {

      task.addEventListener("dragover", function () {
        const cardBeingDragged = document.querySelector(".dragging");
        this.appendChild(cardBeingDragged);
        
      });

      task.addEventListener("dragleave", function () {
        this.classList.remove("over");

      });
      //quando for dropado, salve os elementos.
      task.addEventListener("drop", function () {
        this.classList.remove("over");
        console.log(this)
        console.log('droped')
      });
    });
  }
}

const shortCard = new Card("shortCard");
const mediumCard = new Card("mediumCard");
const longCard = new Card("longCard");

