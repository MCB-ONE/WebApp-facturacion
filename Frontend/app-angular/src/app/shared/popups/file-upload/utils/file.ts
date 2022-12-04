import { base64ToFile } from "ngx-image-cropper";
import { buffer } from "stream/consumers";

  // Función que captura el segmento deseado de la imagen y devuelve/ crea neuvo archivo de imagen
export const dataURLtoFile = (dataurl: any, filename: any): File => {

  // 1. caputa la extensión del archivo
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];

  // 2. caputa el contenido binario de la selección realizada mediante la herramienta crop
  const bstr = atob(arr[1]);
  //const bstr = Buffer.from(arr[1], 'base64');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

    // 3. bucle para generar el contenido binario
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Crea y devuelve un nuevo archivo de imagen a guardar en firebase
  return new File([u8arr], filename, {type: mime});
};
