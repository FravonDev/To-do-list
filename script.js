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
    this.loadMethods();
  }
  loadMethods() {
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
    groupTaskElements.addEventListener(
      "mouseenter",
      function (e) {
        this.prototype.dragAndDrop(e.path[0]);
      }.bind(Card)
    );

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
    // FIXME:
    //verificar
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
        this.updateTask(index, label.parentNode);
      };
    });

    currentCard = document.querySelector(`#${this.name}`);

    currentCard.querySelectorAll(".removeButton").forEach((element) => {
      element.onclick = () => {
        let array = Array.from(element.parentNode.parentNode.children);
        const index = array.indexOf(element.parentNode);
        this.removeTask(index, element);
      };
    });
  }
  removeTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem(`${this.name}`));
    tasks.splice(index, 1);
    localStorage.setItem(`${this.name}`, JSON.stringify(tasks));
    this.tasks = tasks;
    //FIXME:
    console.log(element.parentNode.remove());
  }
  // validar descrição
  validateDescription(description) {
    if (typeof description != "string" || description.trim() == "") {
      return false;
    }
  }
  // método para arrastar e soltar as tarefas.
  dragAndDrop(element) {
    let cards = [shortCard, mediumCard, longCard];
    element.ondragstart = function () {
      //pegar o index do elemento, na posição original.
      //index antes
      let array = Array.from(element.parentNode.children);
      const indexBefore = array.indexOf(element);

      //verificar de qual card retirar a tarefa (recortar).
      let cardElement = element.parentNode.parentNode;
      for (let card of cards)
        if (card.name == cardElement.id) {
          //retirar do objeto e guarda-lo
          const dragging = card.tasks.splice(indexBefore, 1);
          //atualizar o json com a task retirada.
          localStorage.setItem(card.name, JSON.stringify(card.tasks));
        }
      // quando ele estiver sendo arrastado deve receber a classe is dragging
      element.classList.add("is-dragging");

      // Acenturar a cor do card, de cada card (onde estão as tasks).
      document
        .querySelectorAll(".tasks")
        .forEach((task) => task.classList.add("highlight"));

      //quando o elemento parar de ser arrastado
      element.ondragend = function () {
        //index final
        let array = Array.from(element.parentNode.children);
        const indexAfter = array.indexOf(element);
        //verificar  qual card vai receber o valor.
        let cardElement = element.parentNode.parentNode;
        for (let card of cards)
          if (card.name == cardElement.id) {
            //retirar do objeto e guarda-lo
            let dragging = new Task(
              element.querySelector("input").checked,
              element.querySelector("label").innerText
            );

            card.tasks.splice(indexAfter, 0, dragging);
            //atualizar o json com a task retirada.
            localStorage.setItem(card.name, JSON.stringify(card.tasks));
          }

        //Remover o efeito de arrastando
        element.classList.remove("is-dragging");

        //remover todos os efeitos de disponilidadade
        document
          .querySelectorAll(".tasks")
          .forEach((task) => task.classList.remove("highlight"));
      };
      //loop por todos os cards
      document.querySelectorAll(".tasks").forEach((task) => {
        //receber o card que foi arrastado, é importante ter o preventdafault para poder usar o ondrop.
        let test = task.addEventListener("dragover", function (e) {
          //classe para colocar o verde no fundo (de disponibilidade)
          e.preventDefault();
          this.classList.add("over");

          const cardBeingDragged = document.querySelector(".is-dragging");
          this.appendChild(cardBeingDragged);
        });
        //remover o background verde
        task.addEventListener("dragleave", function () {
          this.classList.remove("over");
        });
        //quando for dropado, salve os elementos.
        task.ondrop = function () {
          this.classList.remove("over");
        };
      });
    };
  }
}

const shortCard = new Card("shortCard");
const mediumCard = new Card("mediumCard");
const longCard = new Card("longCard");



//scripts de estilo


