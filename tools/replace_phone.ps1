param()

# Recursively replace phone numbers sitewide in common text files.
# - Display numbers become: +60 11-1133 5942
# - tel: links become: tel:+60111135942
# - wa.me links become: https://wa.me/60111135942

$root = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Push-Location -Path (Resolve-Path "$root\..")

$fileGlobs = @('*.html','*.htm','*.php','*.js','*.css','*.txt','*.md')

# Patterns and replacements
$displayReplacement = '+60 11-1133 5942'
$telReplacement = '+60111135942'
$waReplacement = '60111135942'

# Regex patterns
$telHrefPattern = '(?<=href\s*=\s*"tel:)[^"]+'    # number part inside href="tel:..."
$waPattern = '(?<=wa\.me/)[0-9]+'                # number part after wa.me/
$displayPattern = '\+?60[ \-]?[0-9\-\s]{6,15}[0-9]'  # broad match for +60 ...

Write-Host "Replacing phone numbers in $(Get-Location) ..."

Get-ChildItem -Path . -Recurse -File | Where-Object { $fileGlobs -contains $_.Extension } | ForEach-Object {
    $path = $_.FullName
    try {
        $text = Get-Content -Raw -LiteralPath $path -ErrorAction Stop
        $orig = $text

        $text = [Regex]::Replace($text, $telHrefPattern, $telReplacement)
        $text = [Regex]::Replace($text, $waPattern, $waReplacement)
        $text = [Regex]::Replace($text, $displayPattern, $displayReplacement)

        if ($text -ne $orig) {
            Set-Content -LiteralPath $path -Value $text
            Write-Host "Updated: $path"
        }
    } catch {
        Write-Warning "Failed to process $path : $_"
    }
}

Pop-Location
Write-Host "Done."
