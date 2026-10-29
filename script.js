const botoes = document.querySelectorAll(".filtro");
const fotos = document.querySelectorAll(".miniatura");
const galeria = document.getElementById("galeria");
const total = document.getElementById("totalImagens");

const modal = document.getElementById("modal");
const btnFechar = document.getElementById("fechar");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");
const imagemModal = document.getElementById("imagemModal");
const tituloModal = document.getElementById("tituloModal");
const descricaoModal = document.getElementById("descricaoModal");
const categoriaModal = document.getElementById("categoriaModal");
const localModal = document.getElementById("localModal");
const contador = document.getElementById("contador");

let fotosVisiveis = [];
let indiceAtual = 0;

function atualizarVisiveis() {
    fotosVisiveis = [];

    fotos.forEach(function (foto) {
        if (!foto.classList.contains("oculta")) {
            fotosVisiveis.push(foto);
        }
    });

    total.textContent = "Exibindo " + fotosVisiveis.length + " de " + fotos.length + " imagens";
}

function filtrarImagens(categoria) {
    fotos.forEach(function (foto) {
        if (categoria === "todas" || foto.dataset.categoria === categoria) {
            foto.classList.remove("oculta");
        } else {
            foto.classList.add("oculta");
        }
    });

    if (categoria === "todas") {
        galeria.classList.remove("filtrada");
    } else {
        galeria.classList.add("filtrada");
    }

    atualizarVisiveis();
}

botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        botoes.forEach(function (item) {
            item.classList.remove("ativo");
        });
        botao.classList.add("ativo");

        filtrarImagens(botao.dataset.filtro);
    });
});


function mostrarFoto(indice) {
    const quantidade = fotosVisiveis.length;


    indiceAtual = (indice + quantidade) % quantidade;

    const foto = fotosVisiveis[indiceAtual];

    imagemModal.src = foto.src;
    imagemModal.alt = foto.alt;
    tituloModal.textContent = foto.dataset.titulo;
    descricaoModal.textContent = foto.dataset.descricao;
    categoriaModal.textContent = foto.dataset.categoria;
    localModal.textContent = foto.dataset.local;
    contador.textContent = (indiceAtual + 1) + " de " + quantidade;
}

function abrirModal(foto) {
    indiceAtual = fotosVisiveis.indexOf(foto);
    mostrarFoto(indiceAtual);
    modal.classList.add("ativo");
}

function fecharModal() {
    modal.classList.remove("ativo");
}

fotos.forEach(function (foto) {
    foto.addEventListener("click", function () {
        abrirModal(foto);
    });

    foto.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            abrirModal(foto);
        }
    });
});

btnFechar.addEventListener("click", fecharModal);

modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        fecharModal();
    }
});

btnProximo.addEventListener("click", function () {
    mostrarFoto(indiceAtual + 1);
});

btnAnterior.addEventListener("click", function () {
    mostrarFoto(indiceAtual - 1);
});

document.addEventListener("keydown", function (evento) {
    if (!modal.classList.contains("ativo")) {
        return;
    }

    if (evento.key === "Escape") {
        fecharModal();
    }
    if (evento.key === "ArrowRight") {
        mostrarFoto(indiceAtual + 1);
    }
    if (evento.key === "ArrowLeft") {
        mostrarFoto(indiceAtual - 1);
    }
});

filtrarImagens("todas");