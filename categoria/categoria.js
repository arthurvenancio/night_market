
async function trazerObjetoDB(chave) {
    const db = await fetch("../db/db.json")
    .then(response => response.json())

    const link = db[chave];
    const response = await fetch(link);
    const texto = await response.text()

    const linhas = texto.trim().split("\n").map(linha => linha.split(","))

    const [cabecalho, ...dados] = linhas

    const resultado = Object.fromEntries(
        dados.map(colunas => {
            const chaveExterna = colunas[0]
            const objetoInterno = Object.fromEntries(
                cabecalho.slice(1).map((chave, i) => [chave, colunas[i + 1]])
            )
            return [chaveExterna, objetoInterno]
        })
    )

    return resultado
}

document.addEventListener("DOMContentLoaded", async () => {
    
    const categoria = sessionStorage.getItem("categoria")
    const titulo = document.getElementById("categoria-titulo")
    titulo.innerHTML = `${categoria}`

})