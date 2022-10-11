Nova Todo List:

precisamos ter algo que constroi varias Listas de tasks(bloco de notas):
Cada lista terá:

<h3>primeiras ideias</h3>

**nome**
**tem que ser editavél**
**suas tarefas (status), se elas estão checkadas ou não e sua descrição**
**funcionalidade de arrastar e soltar (drag and drop)**
**ter uma função para adicionar, remover, atualizar tarefas Na tela e no localStorage** 

**função de adicionar nova lista e de remover alguma.**


**com um text input e um button para adicionar esta tarefa**

<hr>
<hr>

##nova branch

## Dia 3

<h3>Criei uma nova branch para refazer de forma organizada para ganhar tempo </h3>

    

- [X] Organizar o que será feito:
- [X] criar a classe Task
- [X] criar a classe Card
- [X] a classe card deverá ter um array de TASKS e um nome.

    

    <h2>1 Método de imprimir os dados na tela do seu respectivo Cardelement</h2>

    - [X] deverá receber o checked status(true ou false) e a description
    - [X] adicione os valores no HTMl do seu respectivo card, ou seja se for shortcard(objeto) coloque dentro do shortcard(elementoHTML).
    - [X] se este elemento tiver a **descrição** em branco, se não for uma string ou com espaços. pare a execução do método ou seja,não faça nada (return false).



    <h2> 2 carregar dados  e chamar o método de imprimir na tela.</h2>

    - [X] quando a página for carregada, use o método loadElements()
    - [x] criar o método de carregar dados já existentes.
    - [x] criar um objeto card atráves da classe Card
    - [x] crie o método loadELements(), que pegará os elementos **Deste mesmo card (this)**  na localStorage e colocará cada elemento dentro do elementoCard respectivo, no array tasks, ou seja se for shortcard(objeto) coloque dentro do shortcard(elementoHTML).
    - [x] para cada objeto task, dentro deste array, chame a função adicionar( talvez Imprimir, teste)

    <h2> 2.1 Validar a descrição (Método Secundário) </h2>

    - [X] criar um método para verificar se a string é valida
    - [X] verificar se a descrição é so tipo string, se não está  vazia e se não tem apenas espaços em branco.
    - [X] retornar false se não for valido.

    <h2>3 criar método de guardar novos dados e chamar o método de imprimir na tela.</h2>

    - [X] pegue os dados da tarefa no form primeiro (quando for enviado)
    - [X] a classe cards deverá ter o método de adicionar  os dados no HTML com  o printTask()
    - [X] logo depois de mostrar os dados no html, salve os dados do card no local storage, ou seja adicionou um elemento no cardhtml, pegue os dados dele e salve no localstorage. (Adicione o JSON atualizado no localStorage).


    

    <h2> 4 Método para atualizar, editar uma tarefa e chamar método de remover </h2>

    - [x] criar o método listenForChanges() para verificar sempre se está havendo alguma mudança.
    - [x] se o evento for acionado no label e no checkbox, então atualiza ambos (como se fossem linkados).
    - [x] se o evento for chamado no button delete, pegue o index do elemento em relação as outras tasks.

    - [X] use esse index para procurar o elemento referente a ele no localStorage e exclua de lá, após isso chame o método de salvar localStorage.

    - [X] Finalmente, o remova da tela.

    - [X] pegar esta mudança e salva-la, 
    - [X] dar um jeito de escutar qual elemento está sendo editado (checkbox e label), pegue o index dele em relaçao as outras tasks. use esse index para saber qual elemento ele é na localStorage.
    - [X] pegue os dados da localStorage, edite e guarde novamente, quando fizermos isso ele só mudara no localStorage, na tela ainda estará igual (pelo menos o checkbox), para resolver isso, devemos pegar esses dados atualizados e atribui-los no elemento manualmente (x = y), utilizando o index do elemento esse index.

    - [X] quando atualizar/ remover a função tem que chamar a ela mesma (recursion)


   <h4> 5 Método deletar</h4>

    - [X] criar um botão para exluir.
    - [X] colocar um listener para quando o botão for clicado
    - [X] pegar o card atual.
    - [X] pegar os dados no localStorage e remove-los.
    - [X] vamos pegar o index do elemento que será deletado
    - [X] Remover o elemento da local storage utilizando o index dele pra identifica-lo sem problemas, após remover da localStorage, remova da tela e atualize as taks no objeto Card.

    <h2>Arrastar e soltar (drag and drop)</h2>

    - [x] quando tiver o mouse over o  drag se inciara, chamara o método drag'n drop
    - [x] ulizar "elemento.onevent = function" para chamar apenas uma vez.
    - [X] quando o elemento estiver sendo arrastado, pegue o index dele.
    - [X] verificar se ele está no lugar correto (shortcard mediumcard e longcard)
    - [X] quando colocarmos o elemento onde queremos, pegamos a posição que ele está ocupando agora, e então atualizamos, para isso vamos no localStorage e podemos usar o **splice** pra simplismente adicionar na posição que ele está
    **EXEMPLO:**

    ```
        como queremos usar o splice:
        splice(index, 0, item)          

        tasks = [1,2,3,4,5]

        tasks.splice(2, 0, 15)

        o restultado será:
        [1, 2, 15, 3, 4, 5]
               ⬆
        veja que 15 foi inserido no index 2

    ```
<hr>
<hr>

