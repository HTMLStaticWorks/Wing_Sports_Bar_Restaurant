$files = Get-ChildItem -Path . -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Simple replaces
    $content = $content.Replace('alt="Wing & Harbor Logo" /></a>', 'alt="Wing & Harbor Logo" /><span class="nav-brand-name">Wing & Harbor</span></a>')
    $content = $content.Replace('alt="Wing & Harbor Logo" /></div>', 'alt="Wing & Harbor Logo" /><span class="nav-brand-name">Wing & Harbor</span></div>')
    
    # Handle the multiline case found in some files (index.html, etc)
    $multiline_old = 'alt="Wing & Harbor Logo" />' + "`n" + '      </a>'
    $multiline_old2 = 'alt="Wing & Harbor Logo" />' + "`r`n" + '      </a>'
    
    $multiline_new = 'alt="Wing & Harbor Logo" />' + "`n" + '        <span class="nav-brand-name">Wing & Harbor</span>' + "`n" + '      </a>'
    $multiline_new2 = 'alt="Wing & Harbor Logo" />' + "`r`n" + '        <span class="nav-brand-name">Wing & Harbor</span>' + "`r`n" + '      </a>'
    
    $content = $content.Replace($multiline_old, $multiline_new)
    $content = $content.Replace($multiline_old2, $multiline_new2)
    
    $svg = '<svg class="rtl-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/></svg>'
    $content = $content.Replace('<span class="rtl-toggle-text">AR</span>', $svg)
    
    # In case the user had multiple spaces for multiline
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
