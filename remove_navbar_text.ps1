$files = Get-ChildItem -Path . -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove the nav-brand-name span
    $content = $content.Replace('<span class="nav-brand-name">Wing & Harbor</span>', '')
    
    # Optional: cleanup any empty spaces on empty lines if needed
    
    [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
