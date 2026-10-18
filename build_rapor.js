// 1 sayfalık proje raporunu (proje_raporu.docx) üretir.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, LevelFormat,
} = require("docx");

const KOYU = "264653", TEAL = "2A9D8F", GRI = "5F6B73";
const FONT = "Calibri", BASLIK_FONT = "Cambria";

const metin = (text, opts = {}) => new TextRun({ text, font: FONT, size: 20, ...opts });
const kalin = (text) => metin(text, { bold: true });

const baslik = (text) => new Paragraph({
  spacing: { before: 140, after: 50 },
  children: [new TextRun({ text, font: BASLIK_FONT, size: 24, bold: true, color: KOYU })],
});
const paragraf = (runs) => new Paragraph({ spacing: { after: 60, line: 264 }, alignment: AlignmentType.JUSTIFIED, children: runs });
const madde = (runs) => new Paragraph({ numbering: { reference: "madde", level: 0 }, spacing: { after: 30, line: 252 }, children: runs });

// Sonuç tablosu
const yok = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const ince = { style: BorderStyle.SINGLE, size: 4, color: "D5DBDE" };
const GENISLIK = [3000, 1300];
const hucre = (text, i, ust = false) => new TableCell({
  width: { size: GENISLIK[i], type: WidthType.DXA },
  shading: ust ? { type: ShadingType.CLEAR, color: "auto", fill: KOYU } : undefined,
  borders: { top: yok, left: yok, right: yok, bottom: ince },
  margins: { top: 40, bottom: 40, left: 90, right: 90 },
  children: [new Paragraph({
    alignment: i === 1 ? AlignmentType.RIGHT : AlignmentType.LEFT,
    children: [metin(text, { size: 18, bold: ust || (i === 1 && text === "%78,3"), color: ust ? "FFFFFF" : "222222" })],
  })],
});
const satirlar = [
  ["Ölçü", "Değer"],
  ["5 katlı çapraz doğrulama (60 öğrenci)", "%78,3"],
  ["Ayrı test kümesi (15 öğrenci)", "%66,7"],
  ["Eğitim kümesi (45 öğrenci)", "%97,8"],
  ["Taban çizgisi (hep “geçer” demek)", "%53,3"],
];
const tablo = new Table({
  width: { size: GENISLIK[0] + GENISLIK[1], type: WidthType.DXA },
  columnWidths: GENISLIK,
  rows: satirlar.map((r, k) => new TableRow({ children: r.map((t, i) => hucre(t, i, k === 0)) })),
});

// Grafik + tablo yan yana (kenarlıksız düzen tablosu)
const grafik = new ImageRun({
  type: "png",
  data: fs.readFileSync("grafik_gecme_orani.png"),
  transformation: { width: 290, height: 186 },
  altText: { title: "Geçme oranı grafiği", description: "Çalışma süresi grubuna göre geçme oranı: %13, %36, %64, %100", name: "grafik" },
});
const DUZEN = [4700, 4326];
const duzenHucre = (children, i) => new TableCell({
  width: { size: DUZEN[i], type: WidthType.DXA },
  borders: { top: yok, left: yok, right: yok, bottom: yok },
  verticalAlign: "center",
  children,
});
const duzen = new Table({
  width: { size: DUZEN[0] + DUZEN[1], type: WidthType.DXA },
  columnWidths: DUZEN,
  rows: [new TableRow({ children: [
    duzenHucre([new Paragraph({ children: [grafik] }),
      new Paragraph({ children: [metin("Şekil 1. Çalışma süresi grubuna göre geçme oranı", { size: 16, italics: true, color: GRI })] })], 0),
    duzenHucre([tablo,
      new Paragraph({ spacing: { before: 60 }, children: [metin("Tablo 1. Doğruluk (accuracy) sonuçları", { size: 16, italics: true, color: GRI })] })], 1),
  ] })],
});

const doc = new Document({
  creator: "Proje ekibi",
  title: "Öğrenci Başarı Tahmini — Proje Raporu",
  numbering: { config: [{ reference: "madde", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] }] },
  sections: [{
    properties: { page: { margin: { top: 900, bottom: 800, left: 1100, right: 1100 } } },
    children: [
      new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "Öğrenci Başarı Tahmini", font: BASLIK_FONT, size: 36, bold: true, color: KOYU })] }),
      new Paragraph({ spacing: { after: 80 }, children: [metin("Uçtan Uca Yapay Zeka Projesi: Veriden Tahmine — Proje Raporu", { color: TEAL, size: 21 })] }),
      new Paragraph({
        spacing: { after: 60 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "D5DBDE", space: 4 } },
        children: [metin("Hazırlayan: ____________________     Tarih: Ekim 2026     Araçlar: Python, Pandas, Matplotlib, scikit-learn, Google Colab", { size: 17, color: GRI })],
      }),

      baslik("1. Problem"),
      paragraf([metin("Bir öğrencinin "), kalin("haftalık çalışma saati"), metin(", "), kalin("günlük uyku süresi"), metin(" ve "), kalin("devamsızlık gün sayısından"),
        metin(" dersi geçip geçmeyeceğini tahmin etmek. Hedef değişken "), kalin("gecti"), metin(" (1 = geçti, 0 = kaldı), problem türü "), kalin("sınıflandırma"),
        metin(". Erken bir risk tahmini, danışman öğretmenin destek gereken öğrencilere notlar açıklanmadan önce ulaşmasını sağlar.")]),

      baslik("2. Veri"),
      paragraf([metin("Gerçek not verisi kişisel veri olduğundan 60 öğrencilik bir sınıf "), kalin("simüle edildi"),
        metin(": geçme olasılığı çalışma ve uykuyla artıp devamsızlıkla azalıyor, üzerine rastgele gürültü ekli. Veriye bilerek 5 eksik değer ve 1 hatalı kayıt (26 saat uyku) kondu. Hatalı değer eksik sayıldı, eksikler sütun medyanıyla dolduruldu; böylece hiç satır kaybedilmedi. Son veri: 60 satır, 3 özellik, 33 geçti / 27 kaldı.")]),

      baslik("3. Yöntem"),
      paragraf([metin("Veri %75 eğitim (45) ve %25 test (15) olarak bölündü. Model olarak, öğretmene anlatılabilir kurallar ürettiği için "),
        kalin("karar ağacı (DecisionTreeClassifier)"), metin(" seçildi. Ağacın derinliği test verisine bakılmadan, eğitim verisinde 5 katlı çapraz doğrulama ile belirlendi (en iyi: 4). Son olarak model, kullanıcıdan girdi alıp “GEÇER / RİSKLİ” cümlesi döndüren "),
        kalin("tahmin_et()"), metin(" fonksiyonuyla küçük bir uygulamaya dönüştürüldü.")]),

      baslik("4. Sonuç"),
      duzen,
      new Paragraph({ spacing: { after: 40 }, children: [] }),
      madde([kalin("Çalışma saati en belirleyici etken: "), metin("15 saatin üzerinde çalışanların tamamı geçmiş, 5 saatin altındakilerin yalnızca %13'ü.")]),
      madde([kalin("Devamsızlık ikinci sırada "), metin("(kalanlarda ort. 5,8 gün, geçenlerde 4,2); uyku tek başına ayırt edici değil.")]),
      madde([kalin("Model taban çizgisini ~25 puan geçiyor, "), metin("ancak eğitim (%97,8) ile test (%66,7) arasındaki fark aşırı öğrenmeye işaret ediyor.")]),

      baslik("5. Çıkarım"),
      paragraf([metin("Üç basit bilgi, bir öğrencinin risk altında olup olmadığını şanstan belirgin şekilde iyi tahmin etmeye yetiyor ve en güçlü kaldıraç "),
        kalin("düzenli çalışma"), metin(". Ancak veri küçük ve simüle olduğundan sonuçlar bir "), kalin("kavram kanıtıdır"),
        metin(". Sıradaki adımlar: gerçek ve daha büyük veri toplamak, ara sınav notu gibi güçlü bir özellik eklemek ve daha basit bir modelle (sığ ağaç, lojistik regresyon) karşılaştırmak.")]),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => { fs.writeFileSync("proje_raporu.docx", b); console.log("proje_raporu.docx yazıldı"); });
