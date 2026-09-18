const fs = require('fs');

const pages = [
  'about.html', 'services.html', 'menu.html', 
  'events.html', 'pricing.html', 'locations.html', 'contact.html'
];

pages.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Unify height to increase size and keep the same across all pages
    content = content.replace(/height:\s*\d+vh;\s*min-height:\s*\d+px;/g, 'height: 80vh; min-height: 600px;');
    
    // Find the class name used for the hero
    let heroClassMatch = content.match(/\.([a-z-]+-hero)\s*\{/);
    if(heroClassMatch) {
       let heroClass = heroClassMatch[1];
       
       // Replace background property
       let bgRegex = new RegExp(`(\\.${heroClass}\\s*\\{[^}]*?)background:\\s*[^;}]+;`, 'g');
       content = content.replace(bgRegex, `$1background: var(--bg-secondary);`);
       
       // Remove ::before rules that add dark overlays
       let beforeRegex = new RegExp(`\\.${heroClass}::before\\s*\\{[^}]*\\}`, 'g');
       content = content.replace(beforeRegex, '');
       
       // Change hardcoded white text to var(--text-primary) so it works in both themes
       let h1Regex = new RegExp(`(\\.${heroClass}\\s+h1\\s*\\{[^}]*?color:\\s*)(?:#fff|white|#ffffff);`, 'gi');
       content = content.replace(h1Regex, `$1var(--text-primary);`);
       
       // Ensure text-align: center is present
       let classBlockRegex = new RegExp(`(\\.${heroClass}\\s*\\{[^}]*?)\\}`);
       let classBlockMatch = content.match(classBlockRegex);
       if (classBlockMatch && !classBlockMatch[1].includes('text-align: center')) {
           content = content.replace(new RegExp(`(\\.${heroClass}\\s*\\{)`), `$1 text-align: center; `);
       }
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log('Updated ' + pages.length + ' inner pages.');
