"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const mumps_hover_provider_1 = require("./mumps-hover-provider");
const mumps_definition_provider_1 = require("./mumps-definition-provider");
const mumps_signature_help_provider_1 = require("./mumps-signature-help-provider");
const mumps_documenter_1 = require("./mumps-documenter");
const AutospaceFunction = require("./mumps-autospace");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('mumps', new mumps_hover_provider_1.MumpsHoverProvider()));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('mumps', new mumps_definition_provider_1.MumpsDefinitionProvider()));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('mumps', new mumps_signature_help_provider_1.MumpsSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.commands.registerCommand("mumps.documentFunction", () => {
        mumps_documenter_1.DocumentFunction();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("mumps.autoSpaceEnter", () => {
        AutospaceFunction.autoSpaceEnter();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("mumps.autoSpaceTab", () => {
        AutospaceFunction.autoSpaceTab();
    }));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('mumps"', {
        provideDocumentFormattingEdits(document) {
            let textEdits = [];
            for (var i = 0; i < document.lineCount; i++) {
            }
            return textEdits;
        }
    }));
    // context.subscriptions.push(AutospaceFunction)
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map