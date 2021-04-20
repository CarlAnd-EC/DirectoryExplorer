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

'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var subdirRemoved = 0;
var filesRemoved = 0;

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
            removeDir(path);
          }
          else throw new Error(`Directory path could not be found.`);
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

function printHelp() {
  console.log("Usage:");
  console.log("node removeDir.js <path>");
}

function question(query) {
  return new Promise(resolve => {
      rl.question(query, resolve);
  })
}

async function confirm() {
  try {
    const answer = await question('Do you really want to delete this directory? [Y/N]: ');
    rl.close();
    switch (answer) {
      case 'Y': case 'YES': case 'Yes': case 'yes': case 'y':
        console.log("Confirmed...");
        return true;
      case 'N': case 'NO': case 'No': case 'no': case 'n':
        console.log("Denied...");
        return false;
      default:
        console.log("Invalid answer.");
        break;
    }
  } catch (err) {
    console.error('Confirmation rejected', err);
    return;
  }
}

async function removeDir(path){
  const files = fs.readdirSync(path);
  if (files.length > 0) {
    let confirmation = await confirm();
    console.time('Removal Time');
    if(confirmation){
      remove(path);
      console.log("Directory was removed.");
      console.log(`${subdirRemoved} subdirectories were removed.`);
      console.log(`${filesRemoved} files were removed.`);
    }
    else console.log("Directory was not removed");
    console.timeEnd('Removal Time');
  } 
  else {
    fs.rmdirSync(path);
    console.log("Directory was removed.");
  }
}

function remove(path) {
    const files = fs.readdirSync(path)
    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          remove(path + "/" + filename)
          subdirRemoved++;
        } else {
          fs.unlinkSync(path + "/" + filename);
          filesRemoved++;
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
}