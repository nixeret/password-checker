// Mostra il checker quando si clicca sul bottone
document.getElementById('start-checker').addEventListener('click', () => {
  const checker = document.getElementById('password-checker');
  checker.classList.toggle('hidden');
});

// Funzione per controllare la password
document.getElementById('password-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita il refresh della pagina

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const outputElement = document.getElementById('output');

  if (!username || !password) {
    outputElement.textContent = 'Inserisci sia un nome utente che una password!';
    outputElement.className = 'output error';
    outputElement.style.display = 'block';
    return;
  }

  outputElement.textContent = 'Simulazione in corso...';
  outputElement.style.display = 'block';

  try {
    // Carica la lista di password
    const response = await fetch('xato-net-10milionPasswordList.txt');
    if (!response.ok) throw new Error('Errore nel caricamento del file delle password.');

    const passwordList = await response.text();
    const passwordArray = passwordList.split('\n').map(p => p.trim());

    // Controlla la password
    if (passwordArray.includes(password)) {
      outputElement.textContent = `
        Nome utente: ${username}\n
        Password: ${password}\n
        Risultato: La tua password è troppo comune! Cambiala subito!
      `;
      outputElement.className = 'output error';
    } else {
      outputElement.textContent = `
        Nome utente: ${username}\n
        Password: ${password}\n
        Risultato: La tua password sembra sicura... per ora!
      `;
      outputElement.className = 'output success';
    }
  } catch (error) {
    outputElement.textContent = `Errore: ${error.message}`;
    outputElement.className = 'output error';
  }
});
