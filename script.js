console.log("Ficou uma bosta");
console.warn("ACESSO RESTRITO: Perfil do Administrador Retr0 carregado.");
let mouseMoves = 0;
let isOffline = false;
// NÃO MEXER NA PORRA DO JAVASCRIPT NEM NO HTML ATÉ EU LEMBRAR O QUE FAZERKKKKKKKKKK
// Seleciona os elementos da sua página (vamos criar esses IDs no HTML já já)
const statusElement = document.getElementById('status-code');
const serverElement = document.getElementById('server-state');

window.addEventListener('mousemove', () => {
    // Busca a tela de intro
    const intro = document.getElementById('intro-screen');

    // SÓ CONTA SE: 
    // 1. O servidor NÃO caiu (isOffline é falso)
    // 2. A tela de intro JÁ FOI escondida (tem a classe 'hidden')
    if (isOffline || !intro.classList.contains('hidden')) {
        return; 
    }

    mouseMoves++;

    if (mouseMoves > 200) {
        cairServidor();
    }
});

function cairServidor() {
    isOffline = true;
    
    // Adiciona a classe de erro no quadrado do terminal
    const terminal = document.getElementById('terminal');
    terminal.classList.add('server-error');

    statusElement.innerText = "503";
    serverElement.innerText = "Offline (Overload)";
    
    console.log("Servidor crashou!");
}

function resetarServidor() {
    mouseMoves = 0;
    isOffline = false;
    
    // Remove a classe de erro e volta ao normal
    const terminal = document.getElementById('terminal');
    terminal.classList.remove('server-error');

    statusElement.innerText = "200";
    statusElement.style.color = ""; // Volta pro CSS padrão
    serverElement.innerText = "Online";
    serverElement.style.color = "";
}

function verificarResposta(tipo) {
    const resposta = document.getElementById(`input-${tipo}`).value.toLowerCase();
    const feedback = document.getElementById(`feedback-${tipo}`);
    
    let palavrasChave = [];
    let explicacaoCorreta = "";

    if (tipo === 'http') {
        palavrasChave = ['protocolo', 'comunicação', 'dados', 'transferência'];
        explicacaoCorreta = "O HTTP é o protocolo base da web para transferência de dados entre cliente e servidor.";
    } else if (tipo === 'https') {
        palavrasChave = ['segurança', 'criptografia', 'certificado', 'cadeado', 'seguro'];
        explicacaoCorreta = "O HTTPS é a versão segura do HTTP, usando criptografia para proteger as informações.";
    }

    // Checa se pelo menos 2 palavras-chave aparecem na resposta do usuário
    const acertos = palavrasChave.filter(palavra => resposta.includes(palavra));

    if (acertos.length >= 2) {
        feedback.innerText = "✅ Mandou bem! Sua explicação está no caminho certo.";
        feedback.style.color = "#2ecc71";
    } else {
        feedback.innerHTML = `❌ Quase lá! Tente usar palavras como: <strong>${palavrasChave.join(', ')}</strong>.<br><br>💡 Conceito real: ${explicacaoCorreta}`;
        feedback.style.color = "#ff4d4d";
    }
}

function iniciarSite() {
    const intro = document.getElementById('intro-screen');
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.classList.add('hidden');
    }, 800);
}

function abrirConfigs() {
    document.getElementById('config-panel').classList.remove('hidden');
}

function fecharConfigs() {
    document.getElementById('config-panel').classList.add('hidden');
}

function mudarTema() {
    const tema = document.getElementById('theme-selector').value;
    const body = document.body;
    const terminal = document.getElementById('terminal');
    const headerTitle = document.querySelector('header h1');
    const sections = document.querySelectorAll('main section');
    const textareas = document.querySelectorAll('textarea'); // Pega todas as caixas de resposta

    if (tema === 'purple') {
        body.style.backgroundColor = '#2d1b4e';
        body.style.color = '#e0b3ff';
        headerTitle.style.color = '#00f3ff';
        headerTitle.style.textShadow = "0 0 15px #00f3ff";
        
        terminal.style.backgroundColor = '#1a0b2e';
        terminal.style.borderColor = '#00f3ff';
        terminal.style.color = '#00f3ff';

        sections.forEach(sec => {
            sec.style.backgroundColor = '#1a0b2e';
            sec.style.borderLeft = '5px solid #00f3ff';
            sec.style.color = '#e0b3ff';
        });

        // Caixa de texto: Roxo bem escuro e opaco
        textareas.forEach(txt => {
            txt.style.backgroundColor = '#0d051a'; 
            txt.style.color = '#e0b3ff';
            txt.style.border = '1px solid #4a3070';
        });

    } else if (tema === 'dark') {
        body.style.backgroundColor = '#0d1117';
        body.style.color = '#c9d1d9';
        headerTitle.style.color = '#f0883e';
        headerTitle.style.textShadow = "0 0 15px #f0883e";

        terminal.style.backgroundColor = '#161b22';
        terminal.style.borderColor = '#f0883e';
        terminal.style.color = '#f0883e';

        sections.forEach(sec => {
            sec.style.backgroundColor = '#161b22';
            sec.style.borderLeft = '5px solid #f0883e';
            sec.style.color = '#c9d1d9';
        });

        // Caixa de texto: Cinza chumbo (quase preto)
        textareas.forEach(txt => {
            txt.style.backgroundColor = '#010409';
            txt.style.color = '#c9d1d9';
            txt.style.border = '1px solid #30363d';
        });

    } else {
        // TEMA OCEAN (Padrão)
        body.style.backgroundColor = '#F0F4F8';
        body.style.color = '#102A43';
        headerTitle.style.color = '#102A43';
        headerTitle.style.textShadow = "none";

        terminal.style.backgroundColor = '#243B53';
        terminal.style.borderColor = '#48BB78';
        terminal.style.color = '#BCCCDC';

        sections.forEach(sec => {
            sec.style.backgroundColor = '#ffffff';
            sec.style.borderLeft = '5px solid #48BB78';
            sec.style.color = '#102A43';
        });

        // Caixa de texto: Branca padrão
        textareas.forEach(txt => {
            txt.style.backgroundColor = '#ffffff';
            txt.style.color = '#102A43';
            txt.style.border = '1px solid #cbd5e0';
        });
    }
}

// Abre o overlay
function abrirConfigs() {
    document.getElementById('config-overlay').classList.remove('hidden');
}

// Fecha o overlay
function fecharConfigs() {
    document.getElementById('config-overlay').classList.add('hidden');
}

// Lógica de fechar ao clicar fora (no fundo escuro)
function fecharAoClicarFora(event) {
    const overlay = document.getElementById('config-overlay');
    // Se o alvo do clique for o fundo (overlay) e não o painel interno
    if (event.target === overlay) {
        fecharConfigs();
    }
}

// Botão para voltar para a Intro
function voltarParaIntro() {
    fecharConfigs(); // Fecha o painel primeiro
    const intro = document.getElementById('intro-screen');
    intro.classList.remove('hidden'); // Faz a intro aparecer
    setTimeout(() => {
        intro.style.opacity = '1'; // Suaviza a volta da intro
    }, 10);
}

function iniciarSite() {
    const intro = document.getElementById('intro-screen');
    const btnConfig = document.getElementById('btn-config-flutuante');
    
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.classList.add('hidden');
        btnConfig.classList.remove('hidden'); // O botão de engrenagem aparece aqui!
    }, 800);
}

function voltarParaIntro() {
    fecharConfigs();
    const intro = document.getElementById('intro-screen');
    const btnConfig = document.getElementById('btn-config-flutuante');
    
    btnConfig.classList.add('hidden'); // Esconde a engrenagem ao voltar pra intro
    intro.classList.remove('hidden');
    setTimeout(() => {
        intro.style.opacity = '1';
    }, 10);
}

const dadosCreditos = {
    criador: {
        titulo: "CRIADOR_DO_SISTEMA",
        nomes: ["Marcus (Retr0) - Lead Developer"]
    },
    equipe: {
        titulo: "PARCEIROS_DE_EQUIPE",
        nomes: ["Nome do Amigo 1 - Ideias", "Nome do Amigo 2 - Design", "Nome do Amigo 3 - Pesquisa"]
    }
};

function abrirCreditos(tipo) {
    const modal = document.getElementById('modal-creditos');
    const titulo = document.getElementById('titulo-creditos');
    const lista = document.getElementById('lista-creditos');
    
    lista.innerHTML = "";
    if(tipo === 'criador') {
        titulo.innerText = "CRIADOR_DO_SISTEMA";
        lista.innerHTML = "<p>> Marcus (Retr0)</p>";
    } else {
        titulo.innerText = "PARCEIROS_DE_EQUIPE";
        lista.innerHTML = "<p>> Amigo 1</p><p>> Amigo 2</p>";
    }
    modal.classList.remove('hidden');
}

function fecharCreditos() {
    document.getElementById('modal-creditos').classList.add('hidden');
}

function fecharAoClicarFora(event) {
    // Fecha o modal de créditos ou o de config se clicar no fundo escuro
    if (event.target.id === 'modal-creditos') fecharCreditos();
    if (event.target.id === 'config-overlay') fecharConfigs();
}

function mostrarMenuDinamico(tipo) {
    const barraTopo = document.getElementById('barra-topo-creditos');
    const principal = document.getElementById('conteudo-principal');
    const creditos = document.getElementById('conteudo-creditos');
    const titulo = document.getElementById('titulo-dinamico');
    const lista = document.getElementById('lista-dinamica');

    // ESCONDE TUDO: Barra do topo e Menu central
    barraTopo.classList.add('hidden');
    principal.classList.add('hidden');
    
    // MOSTRA A PÁGINA LIMPA
    creditos.classList.remove('hidden');

    if (tipo === 'criador') {
        titulo.innerText = "SISTEMA_OWNER: IDENTIFIED";
        lista.innerHTML = "<p>> MARCUS (RETR0)</p><p>> DEVELOPER & STUDENT</p>"; //
    } else {
        titulo.innerText = "NETWORK_COLABORATORS";
        lista.innerHTML = "<p>> PARCEIRO_01</p><p>> PARCEIRO_02</p>";
    }
}

function voltarAoMenuPrincipal() {
    const barraTopo = document.getElementById('barra-topo-creditos');
    const principal = document.getElementById('conteudo-principal');
    const creditos = document.getElementById('conteudo-creditos');

    // VOLTA TUDO AO NORMAL
    creditos.classList.add('hidden');
    barraTopo.classList.remove('hidden');
    principal.classList.remove('hidden');
}