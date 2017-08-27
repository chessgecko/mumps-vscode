import * as vscode from 'vscode';
let em = require('emcellent');
let tabSize = vscode.workspace.getConfiguration().get("editor.tabSize")
var prevfin = true;

function autoSpaceEnter(){
  let editor = vscode.window.activeTextEditor
  let pos = editor.selection.active
  let currentLine = editor.document.lineAt(pos.line).text;
  let parsed = em.parse(currentLine);

  //check for removing a trailing .
  if ((parsed[0].lineRoutines == null || parsed[0].lineRoutines.length == 0) && currentLine.indexOf(";") == -1 && parsed[0].lineIndentationArray != null && parsed[0].lineIndentationArray.length > 0) {
    parsed[0].lineIndentationArray.splice(-1)
    editor.edit((editBuilder) => {
      editBuilder.replace(new vscode.Range(pos.with(pos.line, 0), pos.with(pos.line, currentLine.length)), em.render(parsed))
    })
    //check for adding indentation to the new line
  } else{
    if(parsed[0].lineIndentationArray == null){
      parsed[0].lineIndentationArray = []
    } 
    if(lineContainsNoParamDo(currentLine)) parsed[0].lineIndentationArray.push(" ")
    parsed[0].lineRoutines = []
    parsed[0].lineComments = ""
    parsed[0].lineLabel = ""
    editor.edit((editBuilder) => {
      editBuilder.insert(pos, "\n"+ em.render(parsed))
    })
  }
}

function lineContainsNoParamDo(line){
  if(line.length < 4) return false;
  for(var i = 1; i <line.length-2; i++){
    if(line.charAt(i) !="d" && (line.charAt(i-1) !=" " || line.charAt(i-1) !="\t")) continue;
    if(line.charAt(i+1)==" "){
      if(line.charAt(i+2)==" ") return true
      continue;
    } 
    if(line.charAt(i+1)==":"){
        if(checkForTwoSpaces(line,i+2)) return true;
    }
  }
  return false;
}

function checkForTwoSpaces(line,afterColon){
  for(var i=afterColon; i<line.length-2;i++){
    if(line.charAt(i)=="("){
      i = FindEndOfParenMatch(line,i)
      if(i==-1) return false;
      continue;
    } 
    if(line.charAt(i)!=" ") continue;
    return line.charAt(i+1)==" "
  }
  return true;
}
function FindEndOfParenMatch(line,start){
  let stack = 0;
  for(var i=start; i<line.length-2;i++){
    if(line.charAt(i)=="(") stack++;
    if(line.charAt(i)==")") stack--;
    if(stack==0) return line.charAt(i)
  }
  return -1;
}

function autoSpaceTab(){
  let editor = vscode.window.activeTextEditor
  let pos = editor.selection.active
  let currentLine = editor.document.lineAt(pos.line).text;
  let parsed = em.parse(currentLine);
  if ((parsed[0].lineRoutines == null || parsed[0].lineRoutines.length == 0) && currentLine.indexOf(";") == -1 && parsed[0].lineIndentationArray != null && parsed[0].lineIndentationArray.length > 0) {
    parsed[0].lineIndentationArray.push(" ")
    editor.edit((editBuilder) => {
      if (currentLine.charAt(pos.character - 1) == " ") {
        editBuilder.insert(pos.with(pos.line, pos.character), ". ")
      } else {
        editBuilder.insert(pos.with(pos.line, pos.character), " . ")
      }
    })
  } else {
    editor.edit((eb) => {
      eb.insert(pos, "\t")
    })
  }
}

export {autoSpaceTab, autoSpaceEnter};