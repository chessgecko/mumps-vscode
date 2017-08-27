"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let Hover = vscode.Hover;
let MumpsToken = require('./mumps-language-token').MumpsToken;
class MumpsHoverProvider {
    provideHover(document, position) {
        let token = new MumpsToken(document, position);
        if (!token.mayBeCommand && !token.isIntrinsic && !token.isLabelReference) {
            return;
        }
        if (token.definition) {
            let definition = token.definition;
            var snippet = { language: 'typescript', value: definition.functionSignature || definition.name };
            return new Hover([snippet, definition.description]);
        }
    }
}
exports.MumpsHoverProvider = MumpsHoverProvider;
//# sourceMappingURL=mumps-hover-provider.js.map