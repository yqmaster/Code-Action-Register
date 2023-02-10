import * as vscode from "vscode";

const codeActionInfos: CodeActionInfo[] = [
  {
    title: "Format Document",
    actionKind: vscode.CodeActionKind.Source.append("formatDocument"),
    command: "editor.action.formatDocument",
    tooltip: "This will format the document with the default formatter."
  },
  {
    title: "Format Imports",
    actionKind: vscode.CodeActionKind.Source.append("formatImports"),
    command: "extension.sortImports",
    tooltip: "This will format the document's imports."
  }
];

interface CodeActionInfo {
  title: string;
  actionKind: vscode.CodeActionKind;
  command: string;
  tooltip: string;
}

/**
 * A code action can be any command that is {@link commands.getCommands known} to the system.
 */
export class Provider implements vscode.CodeActionProvider {
  private cache: vscode.CodeAction[] | undefined;

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    this.cache ?? this.makeCodeActions();
    return this.cache;
  }

  private makeCodeActions() {
    this.cache = codeActionInfos.map((info) => {
      return this.makeCodeAction(info);
    });
  }

  private makeCodeAction(info: CodeActionInfo): vscode.CodeAction {
    const action = new vscode.CodeAction(info.title, info.actionKind);
    action.command = {
      command: info.command,
      title: info.title,
      tooltip: info.tooltip
    };
    return action;
  }
}
