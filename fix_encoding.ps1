$files = Get-ChildItem -Path . -Filter *.html
foreach ($file in $files) {
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Fix double-encoded UTF-8 characters
    $content = $content.Replace('â†’', '→')
    $content = $content.Replace('âœ”', '✔')
    $content = $content.Replace('âœ•', '✖')
    $content = $content.Replace('â€¢', '•')
    $content = $content.Replace('â€“', '–')
    $content = $content.Replace('â€”', '—')
    $content = $content.Replace('â€™', '’')
    $content = $content.Replace('â€œ', '“')
    $content = $content.Replace('â€', '”')
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
