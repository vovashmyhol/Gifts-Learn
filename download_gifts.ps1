
# Create gifts folder
if (-not (Test-Path "gifts")) {
    New-Item -ItemType Directory -Path "gifts"
}

# Read gifts list
$gifts = Get-Content "gifts_list.json" | ConvertFrom-Json

Write-Host "Starting download of $($gifts.Count) gifts..."

foreach ($gift in $gifts) {
    $name = $gift.name -replace '[^a-zA-Z0-9 ]', ''
    $filename = "gifts/$name.webp"
    $url = "https://tongifts.wiki/images/collections/$($gift.slug).webp"
    
    if (Test-Path $filename) {
        Write-Host "Skipping $name (already exists)"
        continue
    }

    try {
        Write-Host "Downloading $name..."
        Invoke-WebRequest -Uri $url -OutFile $filename -ErrorAction Stop
        # Small delay to be polite to the server
        Start-Sleep -Milliseconds 200
    } catch {
        Write-Warning "Failed to download $name from $url"
    }
}

Write-Host "Done!"
