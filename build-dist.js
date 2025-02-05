const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const fsAsync = Promise.promisifyAll(fs);

const jsFolderPath = "./dist/js";

// Función para extraer números de los nombres de archivo
function extractNumber(filename) {
  const match = filename.match(/(\d+)\.js\.gz$/);
  return match ? parseInt(match[1], 10) : null;
}

// Leer los nombres de los archivos en la carpeta
async function getJsFileNumbers(folderPath) {
  try {
    const files = await fsAsync.readdirAsync(folderPath);
    return files
      .map(extractNumber)
      .filter((number) => number !== null)
      .sort((a, b) => a - b);
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

(async () => {
  // Obtener los números de los archivos JS de la carpeta
  const numbers = await getJsFileNumbers(jsFolderPath);
  console.log("JS File Numbers:", numbers);

  // Generales
  let index_html = "";
  let index_html_length = 0;
  let favicon_png = "";
  let favicon_png_length = 0;

  // Archivos JS
  let app_js = "";
  let app_js_length = 0;
  let chunk_vendors_js = "";
  let chunk_vendors_js_length = 0;

  // Objeto de los archivos dinámicos
  const fileVariables = {};
  numbers.forEach((number) => {
    fileVariables[`file_${number}_js`] = "";
    fileVariables[`file_${number}_js_length`] = 0;
  });

  // Fonts
  let bootstrap_icons_woff = "";
  let bootstrap_icons_woff_length = 0;
  let bootstrap_icons_woff2 = "";
  let bootstrap_icons_woff2_length = 0;

  // Función para convertir a Hexadecimal
  function convertToHex(data) {
    let value = "0x";
    let hexString = data;
    for (let i = 0; i < hexString.length; i++) {
      value += hexString[i];
      if (i % 2 === 1 && i < hexString.length - 1) value += ",0x";
    }
    return {
      newData: value,
      length: hexString.length / 2,
    };
  }

  console.log("INFO: ¡Convertidor de archivos iniciado!");

  const promises = [];

  // Inicio de la conversión de los Archivos a Binarios
  promises.push(
    fsAsync.readFileAsync("./dist/index.html.gz", "hex").then((data) => {
      let { newData, length } = convertToHex(data);
      index_html = newData;
      index_html_length = length;
      return Promise.resolve();
    })
  );

  promises.push(
    fsAsync.readFileAsync("./dist/favicon.png.gz", "hex").then((data) => {
      let { newData, length } = convertToHex(data);
      favicon_png = newData;
      favicon_png_length = length;
      return Promise.resolve();
    })
  );

  promises.push(
    fsAsync.readFileAsync("./dist/js/app.js.gz", "hex").then((data) => {
      let { newData, length } = convertToHex(data);
      app_js = newData;
      app_js_length = length;
      return Promise.resolve();
    })
  );

  promises.push(
    fsAsync
      .readFileAsync("./dist/js/chunk-vendors.js.gz", "hex")
      .then((data) => {
        let { newData, length } = convertToHex(data);
        chunk_vendors_js = newData;
        chunk_vendors_js_length = length;
        return Promise.resolve();
      })
  );

  // Archivos dinámicos
  numbers.forEach((num) => {
    const filePath = `./dist/js/${num}.js.gz`;
    promises.push(
      fsAsync.readFileAsync(filePath, "hex").then((data) => {
        let { newData, length } = convertToHex(data);
        fileVariables[`file_${num}_js`] = newData;
        fileVariables[`file_${num}_js_length`] = length;
        return Promise.resolve();
      })
    );
  });

  // Fonts
  promises.push(
    fsAsync
      .readFileAsync("./dist/fonts/bootstrap-icons.woff.gz", "hex")
      .then((data) => {
        let { newData, length } = convertToHex(data);
        bootstrap_icons_woff = newData;
        bootstrap_icons_woff_length = length;
        return Promise.resolve();
      })
  );

  promises.push(
    fsAsync
      .readFileAsync("./dist/fonts/bootstrap-icons.woff2.gz", "hex")
      .then((data) => {
        let { newData, length } = convertToHex(data);
        bootstrap_icons_woff2 = newData;
        bootstrap_icons_woff2_length = length;
        return Promise.resolve();
      })
  );

  // Ejecutar las promesas
  Promise.all(promises)
    .then(() => {
      let content = `
                #include <pgmspace.h>
                #define index_html_length ${index_html_length}
                const uint8_t index_html[] PROGMEM = {${index_html}};
                #define favicon_png_length ${favicon_png_length}
                const uint8_t favicon_png[] PROGMEM = {${favicon_png}};
                #define app_js_length ${app_js_length}
                const uint8_t app_js[] PROGMEM = {${app_js}};
                #define chunk_vendors_js_length ${chunk_vendors_js_length}
                const uint8_t chunk_vendors_js[] PROGMEM = {${chunk_vendors_js}};
            `;
      numbers.forEach((num) => {
        content += `
                    #define file_${num}_js_length ${
          fileVariables[`file_${num}_js_length`]
        }
                    const uint8_t file_${num}_js[] PROGMEM = {${
          fileVariables[`file_${num}_js`]
        }};
                `;
      });
      content += `
                #define bootstrap_icons_woff_length ${bootstrap_icons_woff_length}
                const uint8_t bootstrap_icons_woff[] PROGMEM = {${bootstrap_icons_woff}};
                #define bootstrap_icons_woff2_length ${bootstrap_icons_woff2_length}
                const uint8_t bootstrap_icons_woff2[] PROGMEM = {${bootstrap_icons_woff2}};
            `;
      console.log("INFO: ¡Conversión finalizada!");
      fs.writeFile("../Esp32S3WROOMN8R2/src/vuejs.h", content, "utf8", () => {
        console.log("INFO: ¡Archivo (vuejs.h) creado correctamente!");
      });
    })
    .catch((err) => {
      console.error(
        "ERROR: Hubo un error en la conversión, verificar los números generados",
        err
      );
      process.exit(1);
    });
})();
