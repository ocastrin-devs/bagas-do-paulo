console.log("Ficou uma bosta");
let mouseMoves = 0;
let isOffline = false;

// Seleciona os elementos da sua página (vamos criar esses IDs no HTML já já)
const statusElement = document.getElementById('status-code');
const serverElement = document.getElementById('server-state');

window.addEventListener('mousemove', () => {
    if (isOffline) return; // Se já caiu, para de contar

    mouseMoves++;

    // Se mexer o mouse mais de 200 vezes (ajuste esse número se quiser)
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