import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the nbexamples-jlab extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'nbexamples-jlab',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension nbexamples-jlab is activated!');
  }
};

export default extension;
