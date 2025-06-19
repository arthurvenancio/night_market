import { atualizarCarrinho , adicionarItemCarrinho } from "../db/carrinho.js";

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

function criarItem(item,itens) {
    const cartao = document.createElement("div");
    cartao.className = "item-card";
    itens[item].Name = item;

    const item_copiado = { ...itens[item] };

    const titulo_item = document.createElement("span")
    titulo_item.innerHTML = `${item} - $${itens[item].Price}`;
    cartao.appendChild(titulo_item)

    const container_acoes = document.createElement("div");
    container_acoes.className = "item-card-actions";

    const botao_adicionar = document.createElement("button");
    botao_adicionar.innerHTML = "Comprar"
    botao_adicionar.classList.add("category-card-btn");
    botao_adicionar.addEventListener("click", () => {
        item_copiado.id = Date.now() + Math.random().toString(36).substring(2, 15);
        adicionarItemCarrinho(item_copiado);
    });

    const botao_descricao = document.createElement("button");
    botao_descricao.innerHTML = "Descrição"
    botao_descricao.classList.add("category-card-btn");
    botao_descricao.addEventListener("click", () => {
        abrirModalDescricao(itens[item]);
    })

    container_acoes.appendChild(botao_descricao);
    container_acoes.appendChild(botao_adicionar);
    cartao.appendChild(container_acoes);
    return cartao;
}

async function preencherItens() {
    const categoria = sessionStorage.getItem("categoria");
    const itens = await trazerObjetoDB(categoria);
    const container = document.getElementById("itens-container");
    container.innerHTML = "";
    console.log(itens);

    Object.keys(itens).forEach(item => {
        const cartao = criarItem(item,itens);
        container.appendChild(cartao);
    })
}

document.addEventListener("DOMContentLoaded", async () => {

    const categoria = sessionStorage.getItem("categoria")
    const titulo = document.getElementById("categoria-titulo")
    titulo.innerHTML = `${categoria}`

    await preencherItens();
    atualizarCarrinho()

})

function abrirModalDescricao(item) {
    const modal = document.getElementById("descricao-modal");
    const titulo = document.getElementById("modal-titulo");
    const descricao = document.getElementById("modal-descricao");

    titulo.textContent = `${item.Name} - $${item.Price}`;
    descricao.textContent = item.Description || "Sem descrição disponível.";
    modal.classList.remove("hidden");
}

function fecharModalDescricao() {
    const modal = document.getElementById("descricao-modal");
    modal.classList.add("hidden");
}

document.getElementById("fechar-modal").addEventListener("click", fecharModalDescricao);

document.getElementById("descricao-modal").addEventListener("click", e => {
    if (e.target.id === "descricao-modal") {
        fecharModalDescricao();
    }
});