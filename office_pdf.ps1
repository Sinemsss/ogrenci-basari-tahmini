# Word/PowerPoint ile PDF ve slayt PNG'leri üretir (görsel kontrol için).
param([string]$Dir)
$word = New-Object -ComObject Word.Application
$d = $word.Documents.Open("$Dir\proje_raporu.docx", $false, $true)
$d.SaveAs2("$Dir\proje_raporu.pdf", 17)
"Rapor sayfa sayisi: " + $d.ComputeStatistics(2)
$d.Close($false); $word.Quit()

if (Test-Path "$Dir\sunum.pptx") {
  $pp = New-Object -ComObject PowerPoint.Application
  $p = $pp.Presentations.Open("$Dir\sunum.pptx", $true, $false, $false)
  New-Item -ItemType Directory -Force "$Dir\onizleme" | Out-Null
  $i = 1
  foreach ($s in $p.Slides) { $s.Export("$Dir\onizleme\slayt-$i.png", "PNG", 1600, 900); $i++ }
  $p.Close(); $pp.Quit()
}
