function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
    .setTitle("SOLICITUD DE DISEÑOS PRIORIDAD")
    .setFaviconUrl("https://cdn.iconscout.com/icon/free/png-512/r-characters-character-alphabet-letter-36029.png");
  return html

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()

}

function buscarID(id) {
  const libro = SpreadsheetApp.openById("1iyba6EH-qooC6mA3jMy1NDFpf42bwcx1Uip-tGwsvT4");
  const Hoja = libro.getSheetByName("Online");
  let UltimaFila = Hoja.getLastRow();
  rangobandejaOnline = `a2:o${UltimaFila}`;
  let bandejaOnline = Hoja.getRange(rangobandejaOnline).getValues();

  let duplicado = 0;
  let fila = 0;

  for (i = 0; i <= UltimaFila - 2; i++) {
    if (bandejaOnline[i][2] == id) {
      duplicado = 1;
      fila = i + 2;
    }
  }
  return [duplicado, fila];
}


function Escribir(hora, dispatcher, id, nodo, direccion, diseno, gestion, contratista, tecnico, fecha, obs, respuesta) {
  const libro = SpreadsheetApp.openById("1iyba6EH-qooC6mA3jMy1NDFpf42bwcx1Uip-tGwsvT4");
  const Hoja = libro.getSheetByName("Online");
  let UltimaFila = Hoja.getLastRow();

  const Hoja2 = libro.getSheetByName("GESTIONES");
  let UltimaFila2 = Hoja2.getLastRow();
  rangobandeja = `a2:B${UltimaFila2}`;
  let bandeja = Hoja2.getRange(rangobandeja).getValues();

  let gestionduplicada = 0;

  for (i = 0; i <= UltimaFila2 - 2; i++) {
    if (bandeja[i][0] == id) {
      gestionduplicada = 1;
    }
  }

  if (gestionduplicada == 0) {
    insertar1 = [[hora, dispatcher, id, nodo, direccion, diseno, gestion, contratista, tecnico, fecha, obs]]
    Hoja.getRange(`a${UltimaFila + 1}:k${UltimaFila + 1}`).setValues(insertar1);
  } else {
    insertar1 = [[hora, dispatcher, id, nodo, direccion, diseno, gestion, contratista, tecnico, fecha, obs]]
    Hoja.getRange(`a${UltimaFila + 1}:k${UltimaFila + 1}`).setValues(insertar1);
    Hoja.getRange(UltimaFila + 1, 4).setBackground("red");
    Hoja.getRange(UltimaFila + 1, 5).setBackground("red");
  }

  if (respuesta != 0) {
    Hoja.getRange(UltimaFila + 1, 15).setValue("RESPONDER CON INFO ADICIONAL")
    Hoja.getRange(UltimaFila + 1, 15).setBackground("yellow");
    Hoja.getRange(UltimaFila + 1, 13).setBackground("yellow");
  }
  return
}