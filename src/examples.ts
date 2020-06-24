import { CommandPalette } from "@lumino/widgets";
import { makeGetRequest } from "./service";
import { Message } from "@lumino/messaging";


export class ExamplesPalette extends CommandPalette {
  constructor(options: CommandPalette.IOptions) {
    super(options);
    this.id = "jupyterlab-example-palette";
    this.title.label = 'Examples';
    this.title.caption = "Examples";
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
    let list = await makeGetRequest('/examples');
    console.log(list);
    this.commands.addCommand('some-id', {
      label: 'Hello World',
      execute: () => {
        console.log("Hello World");
      }
    })
    this.addItem({command: 'some-id', category: "Examples"});
  }
}