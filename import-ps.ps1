$ErrorActionPreference = 'Stop'

Write-Host 'Fetching WooCommerce products...'
$response = Invoke-RestMethod -Uri 'https://sonish.co.in/wp-json/wc/store/products?per_page=100'

$products = @()
foreach ($p in $response) {
    $image = '/images/sample.jpg'
    if ($p.images -and $p.images.Count -gt 0) {
        $image = $p.images[0].src
    }
    
    $cat = 'Fashion'
    if ($p.categories -and $p.categories.Count -gt 0) {
        $cat = $p.categories[0].name
    }
    
    $price = 0
    if ($p.prices -and $p.prices.price) {
        $price = [math]::Round([double]$p.prices.price / 100, 2)
    }

    $obj = [ordered]@{
        name = $p.name
        image = $image
        description = 'An authentic piece from Sonish Collection.'
        brand = 'Sonish'
        category = $cat
        price = $price
        countInStock = 50
        rating = 5
        numReviews = 1
    }
    $products += $obj
}

Write-Host "Processing $($products.Count) products."

$json = $products | ConvertTo-Json -Depth 5
$fileContent = "const products = $json;`n`nexport default products;"

[IO.File]::WriteAllText('C:\Users\siddh\.gemini\antigravity\scratch\sonish-v2\backend\data\products.js', $fileContent, [System.Text.Encoding]::UTF8)
Write-Host 'Successfully wrote mapped WooCommerce products to products.js!'
