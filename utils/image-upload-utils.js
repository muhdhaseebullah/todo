const AwsUtils = require("../utils/aws-utils");
const fs = require("fs").promises;

function getClobContentFromRow(clobStream) {
  return new Promise((resolve, reject) => {
    // console.log('Processing row.');

    // const clobStream = row[0]['IMAGE'];
    let clobContent = "";

    clobStream.on("data", (chunk) => {
      clobContent += chunk;
    });

    clobStream.on("end", () => {
      // console.log('Got all the CLOB content.');
    });

    clobStream.on("close", () => {
      // console.log('CLOB closed.');
      resolve(clobContent);
    });

    clobStream.on("error", reject);
  });
}

class Upload {
  static async uploadImage(folderName, fileName, blob, isString) {
    let clobContent;
    if (!isString) {
      clobContent = await getClobContentFromRow(blob);
    } else {
      clobContent = blob;
    }

    let imageBuffer = new Buffer(clobContent, "base64");
    let filePath = folderName + "/" + fileName + ".jpg";
    await AwsUtils.uploadFile(imageBuffer, filePath);
    return process.env.S3_PUBLIC_URL + filePath;
  }
  static async uploadFileImage(folderName, imageFilePath, fileName) {
    // console.log("folderName: ", folderName);
    // console.log("imageFilePath: ", imageFilePath);
    // console.log("fileName: ", fileName);
    let fileValue = await fs.readFile(imageFilePath);
    fileName = fileName.split(".");
    fileName[fileName.length - 1] = "";
    fileName = fileName.join("");
    let filePath;
    if (imageFilePath.includes(".pdf")) {
      filePath = folderName + "/" + fileName + ".pdf";
    } else {
      filePath = folderName + "/" + fileName + ".jpg";
    }

    await AwsUtils.uploadFile(fileValue, filePath);
    try {
      fs.unlink(imageFilePath);
      console.log("file removed: ", imageFilePath);
    } catch (err) {
      console.log("cannot remove file: ", imageFilePath);
    }
    return process.env.S3_PUBLIC_URL + filePath;
  }

  static async uploadFilePdf(folderName, pdfFilePath, fileName) {
    let fileValue = await fs.readFile(pdfFilePath);
    fileName = fileName.split(".");
    fileName[fileName.length - 1] = "";
    fileName = fileName.join("");
    let filePath = folderName + "/" + fileName + ".pdf";
    await AwsUtils.uploadFile(fileValue, filePath);
    try {
      fs.unlink(pdfFilePath);
      console.log("file removed pdf: ", pdfFilePath);
    } catch (err) {
      console.log("cannot remove file pdf: ", pdfFilePath);
    }
    return process.env.S3_PUBLIC_URL + filePath;
  }

  static async uploadFileImageWithoutRemove(
    folderName,
    imageFilePath,
    fileName
  ) {
    let fileValue = await fs.readFile(imageFilePath);
    fileName = fileName.split(".");
    fileName[fileName.length - 1] = "";
    fileName = fileName.join("");
    let filePath = folderName + "/" + fileName + ".jpg";
    await AwsUtils.uploadFile(fileValue, filePath);
    return process.env.S3_PUBLIC_URL + filePath;
  }

  static async removeFileImage(imageFilePath) {
    try {
      fs.unlink(imageFilePath);
      console.log("file removed: ", imageFilePath);
    } catch (err) {
      console.log("cannot remove file: ", imageFilePath);
    }
  }
}

module.exports = Upload;
