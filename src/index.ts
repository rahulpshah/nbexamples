import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {ExamplesPalette} from './examples';
/**
 * Initialization data for the nbexamples-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'nbexamples-jlab',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension nbexamples-jlab is activated!');
    const { commands } = app;
    const widget: ExamplesPalette = new ExamplesPalette({ commands });
    app.shell.add(widget, 'left');
  }
};

export default extension;
