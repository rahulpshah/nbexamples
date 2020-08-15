import { CommandPalette } from "@lumino/widgets";
import { makeGetRequest } from "./service";
import { Message } from "@lumino/messaging";
import { JupyterFrontEnd } from "@jupyterlab/application";

import {
  IFrame,
  MainAreaWidget,
} from '@jupyterlab/apputils';


const IFRAME_CLASS = 'jp-iframe';
const namespace = 'preview-doc';
let counter = 0;


import  {PreviewWidget} from './preview';


function newPreviewWidget(url: string, text: string): MainAreaWidget<PreviewWidget> {
  // Allow scripts and forms so that things like
  // readthedocs can use their search functionality.
  // We *don't* allow same origin requests, which
  // can prevent some content from being loaded onto the
  // help pages.
  const iframeContent = new IFrame({
    sandbox: ['allow-scripts', 'allow-forms']
  });
  iframeContent.url = url;
  iframeContent.addClass(IFRAME_CLASS);
  
  const content = new PreviewWidget(iframeContent);
  content.id = `${namespace}-${++counter}`;
  content.title.label = text;
  const widget = new MainAreaWidget({ content });
  return widget;
}



export class ExamplesPalette extends CommandPalette {
  private _shell: JupyterFrontEnd.IShell;

  constructor(shell: JupyterFrontEnd.IShell, options: CommandPalette.IOptions) {
    super(options);
    this.id = "jupyterlab-example-palette";
    this.title.label = 'Examples';
    this.title.caption = "Examples";
    this._shell = shell;
  }

  // getCurrentWidget(args: ReadonlyJSONObject): NotebookPanel | null {
  //   const widget = this._tracker.currentWidget;
  //   const activate = args['activate'] !== false;

  //   if (activate && widget) {
  //     this._shell.activateById(widget.id);
  //   }
  //   return widget;
  // }


  /**
   * Refreshes the widget with the paths of files on the server.
   */
  protected async onActivateRequest(msg: Message) {
    super.onActivateRequest(msg);
    let list = await makeGetRequest('/examples') as any;
    
    for(let nb of list) {
      this.commands.addCommand(nb.basename, {
        label: nb.basename,
        execute: () => {
          console.log("Hello World");
          const widget = newPreviewWidget(`/examples/preview?example_id=${nb.filepath}`, nb.basename);
          this._shell.add(widget, 'main');
          return widget;
        }
      })
      this.addItem({command: nb.basename, category: "Examples"});
    }
  }
}