fetch ('js/backend.json')
.then(response => response.json())
.then(data=>{
    //SALVAR OS DADOS VINDOS DO BACK-END LOCALMENTE
    //VAMOS UTILIZAR UM LOCALSTORAGE
    localStorage.setItem('produtos',JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');
    
 

    //SIMULAR CARREGAMENTO ONLINE
    setTimeout(() => {

           //ESVAZIAR A ÁREA DE PRODUTOS
            $("#produtos").empty();

        data.forEach(produto =>{
            var produtoHTML = `
            <!-- ITEM CARD -->
            <div class="item-card">
                <a data-id="${produto.id}" href="#" class="item">
                    <div class="img-container">
                    <img src="${produto.imagem}">
            </div>
            <div class="nome-rating">
              <span class="color-gray">${produto.nome}</span>
              <span class="bold margin-right">
                <i class="mdi mdi-star"></i>
                ${produto.rating}
              </span>
            </div>
            <div class="price">${produto.preco_promocional.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'})}</div>
        </a>
     </div>
     `;
            
            $("#produtos").append(produtoHTML);
    
        });

        //FUNCAO PARA CLICAR NO ITEM E IR PARA OS DETALHES
        $(".item").on('click', function () {
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
        });
        
    }, 1500);

})    
.catch(error => console.error('Erro ao fazer fetch dos dados:' + error));

//VER QUANTOS ITEMS TEM DENTRO DO CARRINHO

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // ALIMENTAR O CONTADOR DA SACOLA
$('.btn-cart').attr('data-count', carrinho.length);

},300);

