document.getElementById('check-password').addEventListener('click', async () => {
  const username = prompt('Inserisci il tuo nome utente:');
  const password = prompt('Inserisci la tua password:');

  if (!username || !password) {
    alert('Per favore, inserisci sia un nome utente che una password!');
    return;
  }

  const outputElement = document.getElementById('output');
  outputElement.textContent = 'Simulazione attacco hacker in corso...';

  // Carica la lista di password comuni
  try {
    const response = await fetch('xato-net-10milionPasswordList.txt');
    if (!response.ok) throw new Error('Errore nel caricamento del file delle password.');

    const passwordList = await response.text();
    const passwordArray = passwordList.split('\n').map(p => p.trim());

    // Controlla se la password è nella lista
    if (passwordArray.includes(password)) {
      outputElement.textContent = `
        Nome utente: ${username}\n
        Password: ${password}\n
        Risultato: Hackerarti è troppo facile! Cambia password o nome utente.
      `;
    } else {
      outputElement.textContent = `
        Nome utente: ${username}\n
        Password: ${password}\n
        Risultato: Non sono riuscito ad hackerarti con un dictionary attack.\n
        Hai scelto delle buone credenziali per ora...\n
        Ricorda però: le password comuni vengono aggiornate continuamente. Controlla regolarmente!
      `;
    }
  } catch (error) {
    outputElement.textContent = `Errore: ${error.message}`;
  }
});
