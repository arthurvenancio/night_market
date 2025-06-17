import db from "./db/db.json" with {type: 'json'}

async function trazerObjetoDB(chave) {
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