const inputText = document.getElementById('input-text');
const encryptButton = document.getElementById('encrypt-button');
const decryptButton = document.getElementById('decrypt-button');
const message = document.getElementById('message');
const copyButton = document.getElementById('copy-button');
const illustration = document.getElementById('illustration');

function encryptText(text) {
    // Convertimos el texto a minúsculas para asegurar que sólo se utilicen letras minúsculas.
    return text.toLowerCase().replace(/e|i|a|o|u/g, match => {
        switch (match) {
            case 'e': return 'enter';
            case 'i': return 'imes';
            case 'a': return 'ai';
            case 'o': return 'ober';
            case 'u': return 'ufat';
        }
    });
}

function decryptText(text) {
    // Desencripta en el orden inverso para evitar conflictos en patrones similares.
    return text.replace(/enter|imes|ai|ober|ufat/g, match => {
        switch (match) {
            case 'enter': return 'e';
            case 'imes': return 'i';
            case 'ai': return 'a';
            case 'ober': return 'o';
            case 'ufat': return 'u';
        }
    });
}

function updateMessage(content, showCopyButton = true) {
    message.innerHTML = content;
    message.classList.remove('hidden');
    illustration.classList.add('hidden');
    if (showCopyButton) {
        copyButton.classList.remove('hidden');
    } else {
        copyButton.classList.add('hidden');
    }
}

encryptButton.addEventListener('click', () => {
    const text = inputText.value;
    if (text === '') {
        updateMessage('Ningún mensaje fue encontrado<br>Ingresa el texto que desees encriptar o desencriptar.', false);
        return;
    }
    const encryptedText = encryptText(text);
    updateMessage(`<br>${encryptedText}`);
});

decryptButton.addEventListener('click', () => {
    const text = inputText.value;
    if (text === '') {
        updateMessage('Ningún mensaje fue encontrado<br>Ingresa el texto que desees encriptar o desencriptar.', false);
        return;
    }
    const decryptedText = decryptText(text);
    updateMessage(`El texto desencriptado es: <br>${decryptedText}`);
});

copyButton.addEventListener('click', () => {
    const text = message.textContent || message.innerText;
    navigator.clipboard.writeText(text).then(() => {
        message.innerHTML += '<br>Texto copiado al portapapeles!';
    }).catch(err => {
        message.innerHTML += `<br>Error al copiar el texto: ${err}`;
    });
});
