const fs = require("fs");
const path = require("path");
// import fs from "fs";
// import path from "path";

const TemplatesDir = path.join(__dirname);
const outputfile = path.join(__dirname, "exports.ts");
const TemplateFolders = fs
.readdirSync(TemplatesDir)
// @ts-ignore
.filter((file) => fs.statSync(path.join(TemplatesDir, file)).isDirectory());
// console.log(TemplateFolders);
// @ts-ignore
let data = TemplateFolders.map((file) => {
    
  let TemplatePath = `export { default as ${file} } from './${file}/Template'`;
  let PreviewPath = `export { default as ${file}Preview } from './${file}/preview.jpg';`;
  return `\n${PreviewPath}`;
}).join("\n");

fs.writeFileSync(outputfile, data, () =>
  console.log("Templates Exported Successfully")
);
