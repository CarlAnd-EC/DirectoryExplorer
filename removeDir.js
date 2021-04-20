/*
Name: removeDir.js
Alias: Directory Remover
Author: Carlos Andrés Escalona Contreras 
Created: 19/04/2021       Updated: 19/04/2021
Proposed by: Javier Solis
Description:
  1.- A directory specified by a path will be removed.
  2.- If directory doesn’t exist, an error message is shown.
  3.- If the directory is not empty, “ask user confirmation”.
  4.- If the user confirms, remove all file and directories.
  5.- Display the number of files or directories removed.
*/

/*
Notes:
Warning, do not delete important directories. This action cannot be undone
Check how “readline” package work
*/

'use strict';

const fs = require('fs');

try {
  switch (process.argv.length) {
    case 2:
      remove(process.cwd());
      break;
    case 3:
      switch (process.argv[2]) {
        case '-h':
        case '--help':
          printHelp();
          break;
        default:
          let path = process.argv[2];
          if(path[0]==='.'){
            if (process.platform === "win32") {
              path = `${process.cwd()}${process.argv[2].slice(1).replace(/\//g,'\\')}`;
            }
            else{
              path = `${process.cwd()}${process.argv[2].slice(1)}`;
            }  
          }
          if (fs.existsSync(path)) {
            remove(path);
          }
          else throw new Error(`Directory does not exist.`);
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

function remove(path){
  console.time('removeDir.js');
  fs.readdir(path, (err, files) => {
    if(files.length>0){
      if(files.length<1){
        console.log(files.toString().replace(/\,/g,'  '));
      }
      else{
        files.forEach(file => {
          if(file.lastIndexOf('.')<0){
            file+='/';
          }
          console.log(file);
        });
      }
    }
    else console.log("Directory is empty.");
  });
  console.timeEnd('removeDir.js');
}

function printHelp() {
  console.log("Usage:");
  console.log("node removeDir.js <path>");
}