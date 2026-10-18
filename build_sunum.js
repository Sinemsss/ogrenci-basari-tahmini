// 5 slaytlık proje sunumunu (sunum.pptx) üretir.
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("C:/Users/Hp/.claude/skills/synced/ba905cdc-c63b-452a-8106-fcec7e9b6ec2_7ea92128-678e-4af8-bc6d-b6b70dd2fff1/pptx/scripts/apply_theme.js");

const THEME = {
  name: "Ogrenci Basari",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F2A30", lt1: "FFFFFF", dk2: "264653", lt2: "EEF4F3",
    accent1: "2A9D8F", accent2: "E76F51", accent3: "E9C46A", accent4: "264653",
    accent5: "8AB17D", accent6: "F4A261", hlink: "2A9D8F", folHlink: "264653",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Öğrenci Başarı Tahmini";
const C = pres.SchemeColor;

pres.defineSlideMaster({
  title: "KOYU",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.5, w: 8.8, h: 1.2, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "ICERIK",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.75, fontSize: 30, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "" } },
  ],
  slideNumber: { x: 9.2, y: 5.2, w: 0.4, h: 0.25, fontSize: 10, color: "7A868C" },
});

const metin = (s, text, o) => s.addText(text, { isTextBox: true, fontSize: 14, color: C.text1, ...o });
const kart = (s, o) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  rectRadius: 0.08, fill: { color: C.background2 }, line: { color: C.background2 }, ...o });

// 1 — Kapak
pres.addSection({ title: "Giriş" });
let s = pres.addSlide({ masterName: "KOYU", sectionTitle: "Giriş" });
s.addText("Öğrenci Başarı Tahmini", { placeholder: "title" });
metin(s, "Çalışma, uyku ve devamsızlıktan dersi geçip geçmeyeceğini tahmin eden bir yapay zeka modeli",
  { x: 0.6, y: 2.85, w: 7.5, h: 0.8, fontSize: 18, color: C.background2, margin: 0 });
metin(s, "Uçtan Uca Yapay Zeka Projesi: Veriden Tahmine  ·  Python · Pandas · scikit-learn · Colab",
  { x: 0.6, y: 4.6, w: 8.8, h: 0.4, fontSize: 12, color: HEX.accent3, margin: 0 });
s.addNotes("Projenin sorusu: bir öğrencinin çalışma saati, uyku süresi ve devamsızlığından dersi geçip geçmeyeceğini tahmin edebilir miyiz?");

// 2 — Problem ve veri
pres.addSection({ title: "Problem ve veri" });
s = pres.addSlide({ masterName: "ICERIK", sectionTitle: "Problem ve veri" });
s.addText("Üç bilgiden tek bir soru: geçer mi, kalır mı?", { placeholder: "title" });
const ozellikler = [
  ["Haftalık çalışma", "saat / hafta", HEX.accent1],
  ["Günlük uyku", "saat / gün", HEX.accent3],
  ["Devamsızlık", "gün / dönem", HEX.accent2],
];
ozellikler.forEach(([ad, birim, renk], i) => {
  const y = 1.3 + i * 0.95;
  kart(s, { x: 0.5, y, w: 3.6, h: 0.75, objectName: `ozellik-${i}` });
  s.addShape(pres.shapes.OVAL, { x: 0.68, y: y + 0.2, w: 0.35, h: 0.35, fill: { color: renk }, line: { color: renk } });
  metin(s, ad, { x: 1.2, y: y + 0.08, w: 2.8, h: 0.35, bold: true, fontSize: 15, margin: 0 });
  metin(s, birim, { x: 1.2, y: y + 0.4, w: 2.8, h: 0.28, fontSize: 12, color: "5F6B73", margin: 0 });
});
s.addShape(pres.shapes.RIGHT_ARROW, { x: 4.3, y: 2.25, w: 0.5, h: 0.4, fill: { color: C.text2 }, line: { color: C.text2 } });
kart(s, { x: 5.0, y: 1.3, w: 4.5, h: 2.65, fill: { color: C.text2 }, line: { color: C.text2 } });
metin(s, [
  { text: "Hedef: gecti (1 / 0)", options: { bold: true, fontSize: 18, color: HEX.accent3, breakLine: true } },
  { text: "Sınıflandırma problemi", options: { fontSize: 14, color: "FFFFFF", breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "60 öğrencilik simüle sınıf", options: { bullet: true, fontSize: 14, color: "FFFFFF", breakLine: true } },
  { text: "5 eksik + 1 hatalı kayıt temizlendi", options: { bullet: true, fontSize: 14, color: "FFFFFF", breakLine: true } },
  { text: "33 geçti / 27 kaldı — dengeli", options: { bullet: true, fontSize: 14, color: "FFFFFF" } },
], { x: 5.25, y: 1.45, w: 4.1, h: 2.4, valign: "top", paraSpaceAfter: 4, margin: 0 });
metin(s, "Gerçek notlar kişisel veri olduğu için veri seti simüle edildi; eksikler medyanla dolduruldu.",
  { x: 0.5, y: 4.3, w: 9, h: 0.4, fontSize: 12, italic: true, color: "5F6B73", margin: 0 });

// 3 — Keşif (en önemli grafik)
pres.addSection({ title: "Keşif" });
s = pres.addSlide({ masterName: "ICERIK", sectionTitle: "Keşif" });
s.addText("Çalıştıkça geçme oranı düzenli olarak artıyor", { placeholder: "title" });
s.addChart(pres.charts.BAR, [{ name: "Geçme oranı", labels: ["0-5 sa", "5-10 sa", "10-15 sa", "15-20 sa"], values: [13, 36, 64, 100] }], {
  x: 0.5, y: 1.2, w: 5.4, h: 3.9, barDir: "col",
  chartColors: [HEX.accent1], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '"%"0',
  dataLabelFontSize: 12, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
  showTitle: true, title: "Haftalık çalışma grubuna göre geçme oranı (%)", titleFontSize: 13, titleColor: HEX.dk2, titleFontFace: "+mn-lt",
  catAxisLabelColor: "5F6B73", valAxisLabelColor: "5F6B73", catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
  catAxisLabelFontSize: 11, valAxisLabelFontSize: 10, valAxisMaxVal: 110, valAxisHidden: true,
  valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60,
});
const bulgular = [
  ["13,8 sa vs 6,1 sa", "Geçenlerin ve kalanların ortalama haftalık çalışması"],
  ["4,2 gün vs 5,8 gün", "Devamsızlık ters yönde etkili ama daha zayıf"],
  ["6,7 sa = 6,7 sa", "Uyku iki grupta aynı; tek başına ayırt etmiyor"],
];
bulgular.forEach(([buyuk, kucuk], i) => {
  const y = 1.3 + i * 1.25;
  kart(s, { x: 6.2, y, w: 3.3, h: 1.05, objectName: `bulgu-${i}` });
  metin(s, buyuk, { x: 6.4, y: y + 0.1, w: 3.0, h: 0.4, bold: true, fontSize: 18, color: C.accent1, margin: 0 });
  metin(s, kucuk, { x: 6.4, y: y + 0.5, w: 3.0, h: 0.5, fontSize: 12, color: "3A464C", margin: 0, valign: "top" });
});

// 4 — Model ve sonuç
pres.addSection({ title: "Model ve sonuç" });
s = pres.addSlide({ masterName: "ICERIK", sectionTitle: "Model ve sonuç" });
s.addText("Model 10 öğrenciden ~8'ini doğru biliyor", { placeholder: "title" });
const statlar = [
  ["%78", "Çapraz doğrulama doğruluğu (60 öğrenci, 5 kat)", C.accent1],
  ["%67", "Ayrı test kümesi (15 öğrencide 10 doğru)", C.text2],
  ["%53", "Taban çizgisi: herkese “geçer” demek", "7A868C"],
];
statlar.forEach(([sayi, etiket, renk], i) => {
  const x = 0.5 + i * 3.08;
  kart(s, { x, y: 1.25, w: 2.84, h: 1.85, objectName: `stat-${i}` });
  metin(s, sayi, { x: x + 0.2, y: 1.35, w: 2.44, h: 0.95, fontSize: 48, bold: true, color: renk, fontFace: "Cambria", margin: 0 });
  metin(s, etiket, { x: x + 0.2, y: 2.3, w: 2.44, h: 0.7, fontSize: 13, color: "3A464C", margin: 0, valign: "top" });
});
metin(s, [
  { text: "Yöntem: ", options: { bold: true } },
  { text: "DecisionTreeClassifier, %75 eğitim / %25 test; derinlik (4) yalnızca eğitim verisinde çapraz doğrulamayla seçildi.", options: { breakLine: true } },
  { text: "Dikkat: ", options: { bold: true, color: HEX.accent2 } },
  { text: "Eğitimde %98, testte %67 — model küçük veriyi kısmen ezberliyor (aşırı öğrenme). Esas ölçü olarak daha kararlı olan çapraz doğrulamayı kullanıyoruz." },
], { x: 0.5, y: 3.4, w: 9, h: 1.4, fontSize: 14, valign: "top", paraSpaceAfter: 8, margin: 0 });

// 5 — Sonuç ve mini uygulama
pres.addSection({ title: "Sonuç" });
s = pres.addSlide({ masterName: "ICERIK", sectionTitle: "Sonuç" });
s.addText("Düzenli çalışma en güçlü kaldıraç", { placeholder: "title" });
metin(s, [
  { text: "Üç basit bilgi, riski şanstan belirgin şekilde iyi tahmin ediyor (%78 vs %53).", options: { bullet: true, breakLine: true } },
  { text: "15 saatin üzerinde çalışanların tamamı geçti; 5 saatin altında yalnızca %13.", options: { bullet: true, breakLine: true } },
  { text: "Veri küçük ve simüle: sonuç bir kavram kanıtı.", options: { bullet: true, breakLine: true } },
  { text: "Sıradaki adım: gerçek veri, ara sınav notu gibi güçlü bir özellik, daha sade model.", options: { bullet: true } },
], { x: 0.5, y: 1.25, w: 4.5, h: 3.6, fontSize: 15, valign: "top", paraSpaceAfter: 10, margin: 0 });
kart(s, { x: 5.3, y: 1.25, w: 4.2, h: 2.6, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: "mini-uygulama" });
metin(s, "Mini uygulama: tahmin_et()", { x: 5.55, y: 1.4, w: 3.8, h: 0.4, bold: true, fontSize: 15, color: HEX.accent3, margin: 0 });
metin(s, [
  { text: ">>> tahmin_et(15, 7.5, 2)", options: { color: "B8D8D3", breakLine: true } },
  { text: "GEÇER (olasılık %100)", options: { color: "FFFFFF", bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: ">>> tahmin_et(4, 6, 9)", options: { color: "B8D8D3", breakLine: true } },
  { text: "RİSKLİ (olasılık %0) — çalışmayı artır, devamsızlığı azalt", options: { color: "FFFFFF", bold: true } },
], { x: 5.55, y: 1.95, w: 3.8, h: 1.75, fontSize: 13, fontFace: "Courier New", valign: "top", margin: 0 });

(async () => {
  await pres.writeFile({ fileName: "sunum.pptx" });
  await applyTheme("sunum.pptx", THEME);
  console.log("sunum.pptx yazıldı");
})();
