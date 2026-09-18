import os
import glob

# 1. Update style.css
css_path = 'assets/css/style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Make the nav logo flex properly
if '.nav-logo {\n  height: 40px;\n  display: flex;\n  align-items: center;\n}' in css:
    css = css.replace('.nav-logo {\n  height: 40px;\n  display: flex;\n  align-items: center;\n}', 
'''.nav-logo {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-brand-name {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: bold;
  color: #121212;
  white-space: nowrap;
}''')
elif '.nav-brand-name' not in css:
    css += '''\n.nav-logo { gap: 10px; }\n.nav-brand-name { font-family: var(--font-heading); font-size: 1.5rem; font-weight: bold; color: #121212; white-space: nowrap; }\n'''

# Update navbar background
old_navbar = '''.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  transition: all var(--transition-normal);
  border-bottom: 1px solid transparent;
}'''
new_navbar = '''.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  transition: all var(--transition-normal);
  background-color: #ffffff;
  border-bottom: 1px solid var(--border-color);
}
.navbar .nav-link,
.navbar .icon-btn,
.navbar .hamburger span,
.navbar .nav-logo svg {
  color: #121212 !important;
}
.navbar .hamburger span {
  background-color: #121212 !important;
}'''

if old_navbar in css:
    css = css.replace(old_navbar, new_navbar)

css = css.replace('.navbar.scrolled {\n  background-color: var(--navbar-bg);', '.navbar.scrolled {\n  background-color: rgba(255, 255, 255, 0.95);')
css = css.replace('.nav-logo svg {\n  height: 100%;\n  width: auto;\n  color: var(--text-primary);\n}', '.nav-logo svg {\n  height: 100%;\n  width: auto;\n  color: #121212;\n}')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update all HTML files
html_files = glob.glob('*.html')
svg_icon = '<svg class="rtl-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Add website name to logo
    html = html.replace('alt="Wing & Harbor Logo" /></a>', 'alt="Wing & Harbor Logo" /><span class="nav-brand-name">Wing & Harbor</span></a>')
    html = html.replace('alt="Wing & Harbor Logo" />\n      </a>', 'alt="Wing & Harbor Logo" />\n        <span class="nav-brand-name">Wing & Harbor</span>\n      </a>')
    
    # Add website name to footer logo if it exists without the text
    html = html.replace('alt="Wing & Harbor Logo" /></div>', 'alt="Wing & Harbor Logo" /><span class="nav-brand-name">Wing & Harbor</span></div>')
    
    # Update RTL toggle button icon
    html = html.replace('<span class="rtl-toggle-text">AR</span>', svg_icon)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)
