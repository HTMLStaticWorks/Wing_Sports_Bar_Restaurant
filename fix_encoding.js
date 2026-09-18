const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(/â†’/g, '→');
    content = content.replace(/âœ”/g, '✔');
    content = content.replace(/âœ•/g, '✖');
    content = content.replace(/â€¢/g, '•');
    content = content.replace(/â€“/g, '–');
    content = content.replace(/â€”/g, '—');
    content = content.replace(/â€™/g, '’');
    content = content.replace(/â€œ/g, '“');
    content = content.replace(/â€/g, '”');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed encoding in ' + files.length + ' files.');
