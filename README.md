# M/MUMPS/GTM / Caché language syntax  for [Visual Studio Code](https://code.visualstudio.com)
### Cloned from [David Gileadi's extension](Repository:https://github.com/dgileadi/mumps-language-vscode.git)

## Features
* Features I implemented
  * Formatter that will format the first character of every line to be a tab when it isnt a label and will add comments to the end of lines if it doesnt contain any commands
  * Automatically indents with mumps formatting when it finds a loop or you are inside a loop
  * Added javadoc label commenting using ctrl + d
  * Enter / tab to remove / add mumps indentation
* Features in David Gileadi's extension
  * Syntax / language highlighting
  * Jumping to labels
  * Hover hints for labeled code blocks (I changed the format)

This language support is very basic (and possibly buggy) because it only does simple parsing and doesn't use a full interpreter.