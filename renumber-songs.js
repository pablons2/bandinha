// renumber-songs.js
const fs = require('fs');

// 1. Load your JSON file
const filePath = 'musicas.json';
let data = JSON.parse(fs.readFileSync(filePath));

// 2. Sort by current number first (optional safety step)
data.sort((a, b) => a.numero - b.numero);

// 3. Renumber sequentially based on array position
data.forEach((song, index) => {
  song.numero = index + 1; // +1 because array starts at 0
});

// 4. Save the updated file
fs.writeFileSync('musicas-renumeradas.json', JSON.stringify(data, null, 2));

console.log(`Renumbered ${data.length} songs successfully!`);
console.log('Saved as musicas-renumeradas.json');