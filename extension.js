let vscode = require('vscode');
let MumpsHoverProvider = require('./mumps-hover-provider').MumpsHoverProvider;
let MumpsDefinitionProvider = require('./mumps-definition-provider').MumpsDefinitionProvider;
let MumpsSignatureHelpProvider = require('./mumps-signature-help-provider').MumpsSignatureHelpProvider;
let DocumentFunction = require('./src/mumps-documenter').DocumentFunction
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
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument( e =>{
        console.log(JSON.stringify(e.contentChanges))
        let change = e.contentChanges[0]
        let editor = vscode.window.activeTextEditor

        if (change.range.isSingleLine){
            let pos = e.contentChanges[0].range.start
            let txt = e.document.lineAt(pos.line);
            if(change.text.charAt(0)== "\n"){
                editor.edit((editBuilder) =>{
                    editBuilder.insert(pos.translate(1,txt.length),"test")
                })
            }
        }
    }))


}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;