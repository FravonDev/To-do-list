Nova Todo List:

precisamos ter algo que constroi varias Listas de tasks(bloco de notas):
Cada lista terá:

<h3>primeiras ideias</h3>

**nome**
**tem que ser editavél**
**suas tarefas (status), se elas estão checkadas ou não e sua descrição**
- usar o index das tarefas no array para fazer o drag and drop.
**ter uma função para adicionar, remover, atualizar tarefas Na tela e no localStorage** 

**função de adicionar nova lista e de remover alguma.**


**com um text input e um button para adicionar esta tarefa**

<hr>
<hr>

##nova branch

## Dia 3

<h3>Criei uma nova branch para refazer de forma organizada para ganhar tempo </h3>

    

- [ ] Organizar o que será feito:

- [ ] criar a classe Task
    - [ ] iniciar o input checkbox como false (poderá e será mudado)

- [ ] criar a classe Card
    - [ ] a classe card deverá ter um array de TASKS e um nome.

    

    <h4>1 Método de imprimir os dados na tela do seu respectivo Cardelement</h4>

    - [X] deverá receber o checked status(true ou false) e a description
    - [X] adicione os valores no HTMl do seu respectivo card, ou seja se for shortcard(objeto) coloque dentro do shortcard(elementoHTML).
    - [X] se este elemento tiver a **descrição** em branco, se não for uma string ou com espaços. pare a execução do método ou seja,não faça nada (return false).



    <h4> 2 carregar dados  e chamar o método de imprimir na tela.</h4>

    - [X] quando a página for carregada, use o método loadElements()
    - [x] criar o método de carregar dados já existentes.
    - [x] criar um objeto card atráves da classe Card
    - [x] crie o método loadELements(), que pegará os elementos **Deste mesmo card (this)**  na localStorage e colocará cada elemento dentro do elementoCard respectivo, no array tasks, ou seja se for shortcard(objeto) coloque dentro do shortcard(elementoHTML).
    - [x] para cada objeto task, dentro deste array, chame a função adicionar( talvez Imprimir, teste)

    <h4> 2.1 Validar a descrição (Método Secundário) </h4>

    - [X] criar um método para verificar se a string é valida
    - [X] verificar se a descrição é so tipo string, se não está  vazia e se não tem apenas espaços em branco.
    - [X] retornar false se não for valido.

    <h4>3 criar método de guardar novos dados e chamar o método de imprimir na tela.</h4>

    - [X] pegue os dados da tarefa no form primeiro (quando for enviado)
    - [X] a classe cards deverá ter o método de adicionar  os dados no HTML com  o printTask()
    - [X] logo depois de mostrar os dados no html, salve os dados do card no local storage, ou seja adicionou um elemento no cardhtml, pegue os dados dele e salve no localstorage. (Adicione o JSON atualizado no localStorage).

    <h4> 4 Método deletar</h4>

    - [ ] vamos pegar o index do elemento que será deletado
    - [ ] Remover o elemento da local storage utilizando o index dele pra identifica-lo sem problemas, após remover da localStorage, remova da tela.
    

    <h4> 5 Método para atualizar, editar uma tarefa</h4>

    - [ ] dar um jeito de escutar qual elemento está sendo editado (checkbox e label), pegue o index dele em relaçao as outras tasks. use esse index para saber qual elemento ele é na localStorage.
    - [ ] pegue os dados da localStorage, edite e guarde novamente, quando fizermos isso ele só mudara no localStorage, na tela ainda estará igual (pelo menos o checkbox), para resolver isso, devemos pegar esses dados atualizados e atribui-los no elemento manualmente (x = y), utilizando o index do elemento esse index.










    
<hr>

## flash ideas
verificar se tem elemento em branco na localStorage adicionado via update (editando uma task pra "").

validação

fazer o método, imprimir aceitar argumentos sobre a inserção, alternativa ao array.push() index do elemento que será atualizado, mas deve ter um valor padrão de this.taks.lenght que é o ultimo elemento 
```
You want the splice function on the native array object.

arr.splice(index, 0, item);
will insert item into arr at the specified index
(deleting 0 items first, that is, it's just an insert).

```

<hr>
<hr>


## dia 2

**adicionar as taks pelo HTML.**
- [X] as tasks se iniciarão como false
- [X] fazer uma unica validação para ver se o texto não está vazio.
- [X] guardar os dados do objeto no localstorage.

## dia 3
- [X] implementar o método refresh
- [ ] mostrar dados da localStorage na tela com o metodo refresh.
<span style="color:green"> *logica por cada dado no array Taks mostre insira este dado no seu respectivo elemento pai*</span>.

**variações**: adicionar novo elemento tem que seguir um fluxo diferente, **exemplo:**
se a pagina for carregada, adicione todos os elementos da localstorage na tela mas se for um novo elemento
