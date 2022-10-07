// Create the taks class
class Task{
    constructor(description ){
        this.status = false
        this.description = description
    }
}

//criar a classe card
class Card{
    name = 'foo';

    constructor(name){
        this.tasks = [];
        this.name = name
    }

    //métodos

    // Método de imprimir
    printTask(status, description){
        console.log(typeof description)
        // validar se a descrição é valida.
        if(description.trim() == "" || typeof description != 'string'){
            //se for invalida, não faça nada.
            console.log('Descrição invalida')
            return false;
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

      
        

    }

}
//testar a função printTask
shortCard = new Card('shortCard')
console.log(shortCard)
shortCard.printTask(true , 'virtual insanity')
shortCard.printTask(false , 'is what we re living in')
shortCard.printTask(false , 'a')
shortCard.printTask(false , '')


shortCard.printTask(true , 'yeah yeah')
shortCard.printTask(false , 'Its alright now')

