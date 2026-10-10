const fs = require('fs');
const path = require('path');

const files = {
  'about.html': 'about.png',
  'services.html': 'service.png',
  'menu.html': 'menu.png',
  'events.html': 'events.png',
  'pricing.html': 'pricing.png',
  'locations.html': 'location.png',
  'contact.html': 'contact.png'
};

for (const [file, img] of Object.entries(files)) {
  const filePath = path.join('d:/September websites/Wing & Sports Bar Restaurant', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Example for locations.html, prefix is 'locations'
  // But wait, some prefixes might be different. Let's just find `[a-z]+-hero` 
  
  // Find the exact background: linear-gradient(135deg, #ff5e00, #ffb703);
  const regexHeroBg = /(\.[a-z]+-hero\s*\{[\s\S]*?)background:\s*linear-gradient\([^)]+\);/g;
  
  if (regexHeroBg.test(content)) {
    // We add the ::before after the class declaration block.
    // Actually, it's easier to just match the hero block, replace the background, and append the ::before block right after it.
    
    // reset regex
    regexHeroBg.lastIndex = 0;
    
    let match = regexHeroBg.exec(content);
    if (match) {
      let heroClass = match[1].match(/\.([a-z]+-hero)/)[1];
      
      content = content.replace(regexHeroBg, `$1background: url('assets/images/${img}') center/cover no-repeat;`);
      
      // insert ::before block after the hero block
      const heroBlockEndRegex = new RegExp(`(\\.${heroClass}\\s*\\{[\\s\\S]*?\\})`);
      content = content.replace(heroBlockEndRegex, `$1\n    .${heroClass}::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 1; }`);
      
      // update h1 color
      const h1Regex = new RegExp(`(\\.${heroClass}\\s*h1\\s*\\{[^}]*)color:\\s*var\\(--text-primary\\)`, 'g');
      if (h1Regex.test(content)) {
        content = content.replace(h1Regex, `$1color: #ffffff !important`);
      } else {
        const h1Regex2 = new RegExp(`(\\.${heroClass}\\s*h1\\s*\\{)`);
        content = content.replace(h1Regex2, `$1 color: #ffffff !important;`);
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file} with ${img} and ${heroClass}`);
    }
  } else {
    // If it was already replaced, check if we can fix h1 if needed, or if it doesn't match
    console.log(`Could not find linear-gradient in ${file}`);
  }
}
