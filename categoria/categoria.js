
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
        cartao.innerHTML = `
        <span>${item}</span>
        <span>$${itens[item].Price}</span>`
        container.appendChild(cartao);
    })
}

document.addEventListener("DOMContentLoaded", async () => {

    const categoria = sessionStorage.getItem("categoria")
    const titulo = document.getElementById("categoria-titulo")
    titulo.innerHTML = `${categoria}`

    await preencherItens();

})