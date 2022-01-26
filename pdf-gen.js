const fs = require("fs");
const PDFDocument = require("pdfkit");
const naturalCompare = require("string-natural-compare");

//PATH can change as you need ♥
let session1_path = "./Manga/Lilith1/";
let session2_path = "./Manga/Lilith2/";

let session1_folder = getNameList(readdir(session1_path));
let session2_folder = getNameList(readdir(session2_path));

//Create at here ♥
mergePageToPDF(session1_path, session1_folder);
mergePageToPDF(session2_path, session2_folder);

function mergePageToPDF(session_path, session_folder) {
  session_folder.map((folder) => {
    let doc = new PDFDocument();
    let fileName = createFileName(folder);

    let folder_path = session_path + "/" + folder + "/";
    let output_path = "./Out/" + session_path.split("/")[2];

    let image_list = getNameList(readdir(folder_path));
    let sorted_file_list = image_list.sort(naturalCompare);

    console.log("--------------------------------------------------");
    doc.pipe(fs.createWriteStream(output_path + fileName));
    sorted_file_list.map((image) => {
      try {
        console.log("Merged : " + fileName + " <-- " + image);
        doc.addPage().image(folder_path + image);
      } catch (e) {
        console.log("ERROR FILE : " + folder_path + image);
      }
    });
    console.log("FILE : " + fileName + " Created at : " + output_path);
    console.log("--------------------------------------------------");
    doc.end();
  });
}

function getNameList(all_folder) {
  let list = all_folder.map((folder) => {
    return folder;
  });

  let folder_name = Object.entries(list).map((file) => {
    return file[1];
  });

  return folder_name;
}

function createFileName(folder) {
  return folder + ".pdf";
}

function readdir(dir) {
  return fs.readdirSync(dir);
}
