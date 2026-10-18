# sunum.pptx'in slaytlarını PNG olarak dışa aktarır; hata olsa da PowerPoint'i kapatır.
param([string]$Dir)
$pp = New-Object -ComObject PowerPoint.Application
try {
  $p = $pp.Presentations.Open("$Dir\sunum.pptx", $true, $false, $false)
  New-Item -ItemType Directory -Force "$Dir\onizleme" | Out-Null
  $i = 1
  foreach ($s in $p.Slides) { $s.Export("$Dir\onizleme\slayt-$i.png", "PNG", 1600, 900); $i++ }
  $p.SaveAs("$Dir\sunum.pdf", 32)
  "Slayt sayisi: " + $p.Slides.Count
  $p.Close()
} finally { $pp.Quit() }
