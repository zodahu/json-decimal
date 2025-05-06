declare module "jsoneditor-react" {
  import { Component, ReactNode, RefObject } from "react";
  import { JSONEditorOptions } from "jsoneditor";

  export interface JsonEditorProps {
    value: any;
    onChange?: (value: any) => void;
    mode?: "tree" | "view" | "form" | "code" | "text";
    navigationBar?: boolean;
    statusBar?: boolean;
    search?: boolean;
    history?: boolean;
    ajv?: any;
    onError?: (error: Error) => void;
    ref?: RefObject<any>;
    [key: string]: any;
  }

  export class JsonEditor extends Component<JsonEditorProps> {
    jsonEditor: any;
    render(): ReactNode;
  }
}
