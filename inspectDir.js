/*
Name: inspectDir.js
Alias: Directory Inspector
Description:
Author: Carlos Andrés Escalona Contreras 
Created: 19/04/2021
Proposed by: Javier Solis
Updated: 19/04/2021
*/
/* 
Write a NodeJs app to list elements in a specific directory:

1.- App will show the list of elements in a directory

2.- If the directory is not specified it will display files in current directory

3.- If the directory not exists, show error message
4.- If an element is a directory, show " directoryName/", otherwise "file: filename".

Upload file in a github repository. Share the link here 
*/
'use strict';

const fs = require('fs');


try {
  switch (process.argv.length) {
    case 2:
      inspect(process.cwd());
      break;
    case 3:
      switch (process.argv[2]) {
        case '-h':
        case '--help':
          break;
        default:
          console.log(process.argv[2]);
          let path = null;
          if (process.platform === "win32" ) {
            console.log("Fucking Windows");
            path = `${process.cwd()}\\${process.argv[2].replace(/\//g,'\\')}`;
          }
          else{
            path = `${process.cwd()}\\${process.argv[2]}`;
          }
          /* 
          if (fs.existsSync(path)) {
            // console.log(fs.lstatSync(path));
            inspect(path);
          }
          else throw new Error(`Directory ${path} does not exist.`);
          */
          break;
      }
      break;
    default:
      throw new SyntaxError('More than 1 argument was received.');
  }
} 
catch (error) {
  console.error(error);
}

function inspect(path){
  console.time('inspectDir.js');
  fs.readdir(path, (err, files) => {
    if(files!==undefined){
      console.log(files.toString().replace(/\,/g,'  '));
    }
    else console.log(`Directory ${path} is empty.`);
  });
  console.timeEnd('inspectDir.js');
}
