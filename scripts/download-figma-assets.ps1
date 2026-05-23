$ErrorActionPreference = 'Stop'

$urls = @(
  # Hero (avatar)
  'http://localhost:3845/assets/9c4d88d443a631676e6dc42c1646488bdd2e473c.svg',
  'http://localhost:3845/assets/f1d6dc1c882b4760bae01f1a52849346edb1e731.svg',
  'http://localhost:3845/assets/b151c0b5ee79386fd63c1c60f99e652850b1f1f3.svg',

  # Sidebar icons
  'http://localhost:3845/assets/eb3a8c5cae712595ee160daa86c7c2d47fefabc8.svg',
  'http://localhost:3845/assets/7ac09c0bcf3893e8292b4dbd5348d100ba2f62c2.svg',
  'http://localhost:3845/assets/3e4583eb7ac4989186f567270a75bd97da1340c0.svg',
  'http://localhost:3845/assets/5ee299997f404a40451a685be45861b507cda3e2.svg',
  'http://localhost:3845/assets/05deb563f01b2097235274500cd846ebc8b38a79.svg',
  'http://localhost:3845/assets/74b4aec9453e795a62eae92dfac909899d1eece2.svg',
  'http://localhost:3845/assets/0427cf770907e2c3e49bc9fdda1195511d722884.svg',
  'http://localhost:3845/assets/ccef4dcad82e2727c92f8f3ab5288cf6eb03c9eb.svg',
  'http://localhost:3845/assets/e288944b3c289d9d6bdf876829b563c617ec4bd1.svg',

  # Work section
  'http://localhost:3845/assets/fc3056be2c0f666ee70b784317b725f1beeb53ec.png',
  'http://localhost:3845/assets/282f91a3bdfb66a4c3aed382f2d2d8944b3d309e.png',
  'http://localhost:3845/assets/bc3af0b18948a69ad2467bc2ea494349b0157087.svg',
  'http://localhost:3845/assets/e3bc4356c495c83b6ced12034224c52d438e1f38.svg',
  'http://localhost:3845/assets/4d419601e257ad71bbc7b5046792bd097833ca7b.png',
  'http://localhost:3845/assets/cefc0d5c2688499044589a9e2f084f3a84a06235.svg',
  'http://localhost:3845/assets/fe7ccdd71f1c78f173f57f60945af20127f6d5ed.svg',

  # Projects (icons)
  'http://localhost:3845/assets/ef50a75a8e2351d36d74c76eef3b23518726e565.svg',
  'http://localhost:3845/assets/e647a11b5ab79caceed8311d7b88a4cc3ff9ff87.png',
  'http://localhost:3845/assets/0e6e073a2aaa83228f3d95d22d0409e97a0d6c11.png',
  'http://localhost:3845/assets/fa31985a49294e7b673be5246eee89a1fc086d90.png',

  # Projects page (card thumbnails)
  'http://localhost:3845/assets/0f8d6f5ee0a13349b74f89c8bffb180ad875e6ad.png',
  'http://localhost:3845/assets/b21d9bf5cff6e1c9280c3747324d541602c6d749.png',
  'http://localhost:3845/assets/1ec3f3f0ff1faf40b004c14c43b7e6856b310347.png',
  'http://localhost:3845/assets/c1daef0909f081774233f9e3315a6a216be4382b.png',

  # Reusable arrow (projects/spotlight)
  'http://localhost:3845/assets/0e4f8b666592bdac4c1370729cc9515d040ce092.svg',

  # Signature
  'http://localhost:3845/assets/81d96eeaf889c9ccb936670c52e31282548ab24c.svg',

  # Projects detail (view-by-id)
  'http://localhost:3845/assets/2a2feb4cfb43eba83d1f8b2fd7f0c4ac7f5d0756.png',
  'http://localhost:3845/assets/5ff810bb7d46e2d98ffee77f87e0e8f2bdd7451f.png',
  'http://localhost:3845/assets/f3008c1383fb69968a853f451bcaa077520b64db.png',
  'http://localhost:3845/assets/25b9699b3e4fffaf79796fc88a6f0657dd43534d.png',
  'http://localhost:3845/assets/8ff3ab103afb9892330985172238c19ade9dbcd6.svg',
  'http://localhost:3845/assets/334a56725b1b07de968e9b9038c932dbc49ba968.svg',
  'http://localhost:3845/assets/264b544f4b94b5623d897cf50560d2cdce677e4e.svg',
  'http://localhost:3845/assets/e8e6b0fce517218294d75244219a7a89bad9e1ad.svg',
  'http://localhost:3845/assets/20c3a459298d85a8ed6beb29eeb4e9131aaa0eda.svg',

  # Tool Stack logos (minimal set for rendering)
  'http://localhost:3845/assets/c998f5c477d3a6011f5b0560bd12454c2cdddf12.svg',

  # Canva (background + text overlay)
  'http://localhost:3845/assets/ca12eaf4846688250a48f3c8b156691fdf635a66.svg',
  'http://localhost:3845/assets/abfd084b1a0357d782b2374bd77e164ce9ba5fe0.svg',

  # Next.js
  'http://localhost:3845/assets/7258ba47ec0c725baf913d389c25f46ea3edc96f.svg',

  # React
  'http://localhost:3845/assets/f2d8026fbf178c4668422debe5c2a42774961736.svg',

  # Git
  'http://localhost:3845/assets/4266478215d1c7ddf81a2aaf8cb2a5d562c74648.svg',

  # GitHub Copilot (base + overlay)
  'http://localhost:3845/assets/2077b03688bd4b4855c01c4ed5742ffa990fe87d.svg',
  'http://localhost:3845/assets/7be7915f8404b4cdfe8fd762561cdc34d0b1930a.svg',

  # Talend (raster slice used by Figma export)
  'http://localhost:3845/assets/da246a831b345d09ed5fa7257be2bb7d9ed67ce1.png',

  # Docker (base whale + simple overlay details)
  'http://localhost:3845/assets/4b1b0ac3a4a035708920961bd3fa9879360637e4.svg',
  'http://localhost:3845/assets/f35e265b58bc6a637d61eecad43eb7f69f5c1a28.svg',

  # Other tools (MySQL icon used on /toolstack)
  'http://localhost:3845/assets/4242817289ec457e9594598602f81d6af490b1a6.svg',

  # Spotlight
  'http://localhost:3845/assets/e6ee9ef64cbffd5a1e68b76b2dbd724a7a4a1cdd.png',
  'http://localhost:3845/assets/31500214005926e31edb90d1d48d13c2a5800c66.png',
  'http://localhost:3845/assets/a8ce72b6c4ad6519beb03028a97fe82d27b77ca0.svg',

  # Spotlight freelancer logo (mask + raster)
  'http://localhost:3845/assets/1eae8c92a1b21fb8398e278e5477366381faa299.png',
  'http://localhost:3845/assets/134cf13a585e3faa1f9b8bad9d89d861b8059add.svg',

  # Spotlight NMIT logo (mask groups + raster already used elsewhere)
  'http://localhost:3845/assets/017807ca859214e2ee4994395445a6325b262107.svg',
  'http://localhost:3845/assets/3d327baa0ebe52d10eba5e6424abd27b5e5da895.svg',
  'http://localhost:3845/assets/edb8b75872cb19623bf6ce1aa20e176cc6e9181a.svg',

  # Footer social strip lines + icons
  'http://localhost:3845/assets/af34c0eeefce53ef5ec83ee8a473bd6aaaca1726.svg',

  # About page
  'http://localhost:3845/assets/192ba5fc6781d0532149425853196aef7e43f4d9.png',
  'http://localhost:3845/assets/ee474aa040c13ed6ce105102cea85b3f517c9914.png',
  'http://localhost:3845/assets/a48182dcb6d795cec817e0112b9c235dd910fb24.png',
  'http://localhost:3845/assets/528e21d72386d0c8e6fbc86eab1323a172927a79.png',
  'http://localhost:3845/assets/56e2ff74100ee4ea7fe29afe075bba9bf065565d.png',
  'http://localhost:3845/assets/17de775133bc215f2d7efedc847ba09551a7a89d.png',
  'http://localhost:3845/assets/41f0107435e2ff80ca6e16a5ce23472142c1ba08.svg',

  # Instagram (2 rasters + mask)
  'http://localhost:3845/assets/b56b1957fee7a2211755508568bd497f49953924.png',
  'http://localhost:3845/assets/8608c9f646a3d54020b931c9628deb9bfc15ad71.png',
  'http://localhost:3845/assets/bb2637c6155ada39c5470e26c3810cde2dbdbed8.svg',

  # Facebook
  'http://localhost:3845/assets/39671032b58721c0f82a753e79f37b01641ded5d.svg',
  'http://localhost:3845/assets/ec5ca55dc398ab65132a9b3c3a4f78c7c80461ca.svg',
  'http://localhost:3845/assets/ea5cd7125b628e0967fb7acf715f5ed6b1cf736f.svg',
  'http://localhost:3845/assets/8c9c78944c89fc53bbb48e105b2abfd189f5bf91.svg',

  # LinkedIn
  'http://localhost:3845/assets/0a45f7a0d4b0416e2f75d5304290884b3dceb931.svg',
  'http://localhost:3845/assets/c4e8e9c2b53460baf287c0a88be572b055b15431.svg',
  'http://localhost:3845/assets/40da1bd35161485d8c64c0b1ca19d4ea85bafb52.svg',
  'http://localhost:3845/assets/7f0dd81c5e24f28f03666fd12e6f137f6c3abc92.svg',
  'http://localhost:3845/assets/e7816f33839ac18af2870bdf80bbec7fda136073.svg',
  'http://localhost:3845/assets/239e3f6e7d7baa04dfa60b28b80e831c95b41fd9.svg',

  # Pinterest
  'http://localhost:3845/assets/99f784d4312bd68b44c35b80b5e9191fb8b347fc.svg',
  'http://localhost:3845/assets/5e38b58b586a7369af9576b466856b4156ecfff3.svg',
  'http://localhost:3845/assets/75e2f4e1129870e356de833fa8c3f57d3b520f5a.svg'
)

$destRoot = Join-Path $PSScriptRoot '..\public\assets\figma'
New-Item -ItemType Directory -Force -Path $destRoot | Out-Null

$seen = @{}
foreach ($url in $urls) {
  if ($seen.ContainsKey($url)) { continue }
  $seen[$url] = $true

  $fileName = [System.IO.Path]::GetFileName([System.Uri]$url)
  if ([string]::IsNullOrWhiteSpace($fileName)) {
    Write-Warning "Skipping (no filename): $url"
    continue
  }

  $outFile = Join-Path $destRoot $fileName
  if (Test-Path $outFile) {
    Write-Host "Exists: $fileName"
    continue
  }

  Write-Host "Downloading: $fileName"
  Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing
}

Write-Host "Done. Output: $destRoot"