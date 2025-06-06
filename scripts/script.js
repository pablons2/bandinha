// script.js

// Variáveis globais
let musicas = []; // Armazenará as músicas carregadas do JSON
let modal = document.getElementById("modal"); // Modal para exibir a letra da música

// Função para carregar as músicas do arquivo JSON
async function carregarMusicas() {
  try {
    const response = await fetch("musicas.json"); 
    if (!response.ok) {
      throw new Error("Erro ao carregar as músicas");
    }
    musicas = await response.json(); // Converte a resposta em JSON
   console.log( musicas, 'MUSICAS')
  } catch (error) {
   
  }
}

// Função para listar as músicas filtradas
function listarMusicas() {
  const input = document.querySelector("input"); 
  const termo = input.value.trim().toLowerCase(); 
  const lista = document.querySelector("ul"); 

  // Limpa a lista atual
  lista.innerHTML = "";

  // Filtra as músicas pelo título
  const musicasFiltradas = musicas.filter((musica) =>
    musica.titulo.toLowerCase().includes(termo)
  ).sort((a, b) => a.numero - b.numero);

  // Adiciona as músicas filtradas à lista
  musicasFiltradas.forEach((musica, index) => {
    const li = document.createElement("li");
    li.className = `flex items-center justify-around gap-5 border-b-1 p-2 opacity-0 animate-fade-in delay-${
      (index + 1) * 100
    }`;
    li.innerHTML = `
      <span>${musica.numero}</span>
      <span>${musica.titulo}</span>
      <button onclick="abrirModal(${musica.numero})" class="cursor-pointer hover:bg-yellow-600 p-2 hover:text-white bg-white text-yellow-600 border-yellow-600 border-1 font-bold rounded-md hover:shadow">
        <i class="bi bi-music-note-beamed"></i> CANTAR
      </button>
    `;
    lista.appendChild(li);
  });
}

// Função para abrir o modal com a letra da música
function abrirModal(numero) {
  const musica = musicas.find((m) => m.numero === numero); // Encontra a música pelo número
  if (musica) {
    const tituloModal = modal.querySelector("h2");
    const letraModal = modal.querySelector("p");

    // Preenche o modal com o título e a letra da música
    tituloModal.textContent = musica.titulo;
    letraModal.innerHTML = musica.letra.replace(/\n/g, "<br />");
    letraModal.textContent = musica.letra;

    // Exibe o modal
    modal.classList.remove("hidden");
  }
}

// Função para fechar o modal
function fecharModal() {
  modal.classList.add("hidden");
}

// Carrega as músicas ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarMusicas();
});

