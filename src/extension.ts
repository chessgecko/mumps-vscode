import * as vscode from 'vscode';
import { MumpsHoverProvider } from './mumps-hover-provider'
import { MumpsDefinitionProvider } from './mumps-definition-provider'
import { MumpsSignatureHelpProvider } from './mumps-signature-help-provider'
import { DocumentFunction } from './mumps-documenter'
import { MumpsDocumentSymbolProvider } from './mumps-document';
import * as AutospaceFunction from './mumps-autospace'

export const MUMPS_MODE: vscode.DocumentFilter = { language: 'mumps', scheme: 'file' };

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            MUMPS_MODE, new MumpsHoverProvider()
        )
    );
    
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            MUMPS_MODE, new MumpsDefinitionProvider()
        )
    );

    context.subscriptions.push(
        vscode.languages.registerSignatureHelpProvider(
            MUMPS_MODE, new MumpsSignatureHelpProvider(), '(', ','
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.documentFunction", () => {
                DocumentFunction();
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.autoSpaceEnter", () => {
                AutospaceFunction.autoSpaceEnter();
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.autoSpaceTab", () => {
                AutospaceFunction.autoSpaceTab();
            }
        )
    );

    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider(MUMPS_MODE, {
            provideDocumentFormattingEdits: (document, options, token) => {
                let textEdits: vscode.TextEdit[] = []
                for (var i = 0; i < document.lineCount; i++) {
                    let line = document.lineAt(i).text;
                    formatDocumentLine(line,i,textEdits);
                }
                return textEdits;
            }
        })
    );

    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(MUMPS_MODE, {
        provideDocumentRangeFormattingEdits: (document, range, options, token) => {
            let textEdits: vscode.TextEdit[] = []
            for (var i = range.start.line; i <= range.end.line; i++) {
                let line = document.lineAt(i).text;
                formatDocumentLine(line,i,textEdits);
            }
            return textEdits;
        }
    }));

    // Document Symbol Outline
    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            MUMPS_MODE, new MumpsDocumentSymbolProvider()
        )
    );

    // context.subscriptions.push(AutospaceFunction)
}

function formatDocumentLine(line:string, lineNumber, textEdits) {
    let emptyLine = line.replace(/(\ |\t)/ig, "");
    if (emptyLine.length == 0) {
        textEdits.push(vscode.TextEdit.insert(new vscode.Position(lineNumber, 0), "\t;"))
    }
    if (line.endsWith(". ")) {
        textEdits.push(vscode.TextEdit.insert(new vscode.Position(lineNumber, line.length), ";"))
    } else if (line.endsWith(".")) {
        textEdits.push(vscode.TextEdit.insert(new vscode.Position(lineNumber, line.length), " ;"))
    }
    if(line.startsWith(" ")){
        let endSpace:number;
        console.log("start")
        for(endSpace = 0; endSpace<line.length; endSpace++){
            if(line.charAt(endSpace) !=" "){
                break;    
            }
        }
        textEdits.push(vscode.TextEdit.replace(new vscode.Range(new vscode.Position(lineNumber,0),new vscode.Position(lineNumber,endSpace)),"\t"));
    }
}

exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;