import db from "./db/db.json" with {type: 'json'}
import { atualizarCarrinho} from "./db/carrinho.js";

function preencherOpcoesCategoria(){
    const categorias = Object.keys(db);
    const container = document.getElementById("categorias-container");
    container.innerHTML = "";

    categorias.forEach(categoria=>{
        const cartao=document.createElement("div");
        cartao.className = "category-card";
        cartao.innerHTML =
        `<a href=#>${categoria}</a>`
        container.appendChild(cartao);

        cartao.addEventListener("click",()=>{
            sessionStorage.setItem("categoria", categoria);
            window.location.href = "categoria/categoria.html";
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    preencherOpcoesCategoria()
    atualizarCarrinho();
})