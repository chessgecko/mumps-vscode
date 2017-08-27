import * as vscode from 'vscode';
import {MumpsHoverProvider} from './mumps-hover-provider'
import {MumpsDefinitionProvider} from './mumps-definition-provider'
import {MumpsSignatureHelpProvider} from './mumps-signature-help-provider'
import {DocumentFunction} from './mumps-documenter'
import * as AutospaceFunction from './mumps-autospace'

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            'mumps', new MumpsHoverProvider()));
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            'mumps', new MumpsDefinitionProvider()));
    context.subscriptions.push(
        vscode.languages.registerSignatureHelpProvider(
            'mumps', new MumpsSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.documentFunction", () => {
                DocumentFunction();
            }
        )
    )
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.autoSpaceEnter", () => {
                AutospaceFunction.autoSpaceEnter();
            }
        )
    )
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "mumps.autoSpaceTab", () => {
                AutospaceFunction.autoSpaceTab();
            }
        )
    )
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('mumps"',{
            provideDocumentFormattingEdits(document){
                let textEdits = []
                for(var i=0; i<document.lineCount;i++){
                    
                }
                return textEdits;
            }
        })
    )
    // context.subscriptions.push(AutospaceFunction)
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;