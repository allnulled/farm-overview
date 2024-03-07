const fs = require("fs");
const capitales_desordenadas = require(__dirname + "/../datos_originales/Capitales.json");
const capitales = capitales_desordenadas.sort(function(cap1, cap2) {
  const pob1 = parseInt(cap1["Ciudad propiamente"].replace(/\./g, ""));
  const pob2 = parseInt(cap2["Ciudad propiamente"].replace(/\./g, ""));
  if(pob1 < pob2) {
    return -1;
  } else if(pob1 > pob2) {
    return 1;
  }
  return 0;
});

let capitales_html = "";

capitales_html += `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capitales</title>
    <style>
      html {
        background-color: #333;
        color: white;
      }
      table {
        font-family: Arial;
        font-size: 11px;
      }
      .table_viewer {
        overflow: scroll;
        width: 500px;
        height: 500px;
        resize: both;
        background-color: white;
        color: black;
        border: 2px solid blue;
        border-radius: 4pt;
      }
    </style>
</head>
<body>
`

capitales_html += "<div class='table_viewer'>\n";
capitales_html += "<table>\n";
capitales_html += "<tr>\n";
capitales_html += "<th>Ránking</th>\n";
capitales_html += "<th>País</th>\n";
capitales_html += "<th>Capital</th>\n";
capitales_html += "<th>Población en ciudad propiamente</th>\n";
capitales_html += "<th>Población en área urbana</th>\n";
capitales_html += "<th>Búsqueda en Youtube</th>\n";
capitales_html += "</tr>\n";
for(let index=0; index<capitales.length; index++) {
  const capital = capitales[index];
  capitales_html += "<tr>\n";
  
  capitales_html += "<td>\n";
  capitales_html += (index + 1);
  capitales_html += "</td>\n";
  
  capitales_html += "<td>\n";
  capitales_html += capital["País"];
  capitales_html += "</td>\n";

  capitales_html += "<td>\n";
  capitales_html += capital["Capital"];
  capitales_html += "</td>\n";

  capitales_html += "<td>\n";
  capitales_html += capital["Ciudad propiamente"];
  capitales_html += "</td>\n";

  capitales_html += "<td>\n";
  capitales_html += capital["Área urbana"];
  capitales_html += "</td>\n";

  capitales_html += "<td>\n";
  const link = "https://www.youtube.com/results?search_query=" + capital["Capital"] + " " + capital["País"] + " drone 4K";
  capitales_html += "<a target='_blank' href=" + JSON.stringify(link) + ">" + link + "</a>\n";
  capitales_html += "</td>\n";

  capitales_html += "</tr>\n";
}
capitales_html += "</table>\n";
capitales_html += "</div>\n";

capitales_html += `
</body>
</html>
`;

fs.writeFileSync(__dirname + "/Capitales.html", capitales_html, "utf8");
fs.writeFileSync(__dirname + "/../docs/index.html", capitales_html, "utf8");