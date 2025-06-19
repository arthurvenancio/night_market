import { atualizarCarrinho } from "../db/carrinho.js";

async function trazerObjetoDB(chave) {
    const db = await fetch("../db/db.json")
        .then(response => response.json())

    const link = db[chave];
    const response = await fetch(link);
    const texto = await response.text()


    const resultadoPapa = Papa.parse(texto, {
        header: true,
        skipEmptyLines: true,
    });

    const linhas = resultadoPapa.data;

    const resultado = Object.fromEntries(
        linhas.map(linha => {
            const { [Object.keys(linha)[0]]: chaveExterna, ...resto } = linha;
            return [chaveExterna, resto];
        })
    );

    return resultado
}

async function preencherItens() {
    const categoria = sessionStorage.getItem("categoria");
    const itens = await trazerObjetoDB(categoria);
    const container = document.getElementById("itens-container");
    container.innerHTML = "";
    console.log(itens);
    
    Object.keys(itens).forEach(item => {
        const cartao = document.createElement("div");
        cartao.className = "item-card";
        itens[item].Name= item;
        
        const titulo_item = document.createElement("span")
        titulo_item.innerHTML = `${item} - $${itens[item].Price}`;
        cartao.appendChild(titulo_item)

        const container_acoes = document.createElement("div");
        container_acoes.className = "item-card-actions";

        const botao_adicionar = document.createElement("button");
        botao_adicionar.innerHTML = "Comprar"
        botao_adicionar.classList.add("category-card-btn");
        botao_adicionar.addEventListener("click", () => {
            adicionarItemCarrinho(itens[item]);
        });

        const botao_descricao = document.createElement("button"); 
        botao_descricao.innerHTML = "Descrição"
        botao_descricao.classList.add("category-card-btn");

        container_acoes.appendChild(botao_descricao);
        container_acoes.appendChild(botao_adicionar);
        cartao.appendChild(container_acoes);

        container.appendChild(cartao);
    })
}

function adicionarItemCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho()
}

document.addEventListener("DOMContentLoaded", async () => {

    const categoria = sessionStorage.getItem("categoria")
    const titulo = document.getElementById("categoria-titulo")
    titulo.innerHTML = `${categoria}`

    await preencherItens();
    atualizarCarrinho()

})