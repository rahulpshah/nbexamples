import { ReactWidget } from '@jupyterlab/apputils';

import React from 'react';

import {
  IFrame
} from '@jupyterlab/apputils';

export interface IPreviewProps {
  iframe: IFrame
}


/**
 * React component for a counter.
 *
 * @returns The React component
 */
class Preview extends React.Component<IPreviewProps> {
  myFunc() {
    alert('Hello World');
  }

  render() {
    const navClasses = "navbar navbar-expand-lg jp-banner"
    const buttonClasses = "btn btn-success float-right"
    const containerClass = "jp-iframe-container"
    return (
      <div className={containerClass}>
        <nav className={navClasses}>
          <button className={buttonClasses} type="submit" onClick={this.myFunc}>Use Template</button>
        </nav>
        <div className={containerClass} dangerouslySetInnerHTML={{__html: this.props.iframe.node.innerHTML}} />
      </div>
    );
  }
};
/**
 * A RunTagCell Lumino Widget that wraps a RunTagCellComponent.
 */
export class PreviewWidget extends ReactWidget {
  /**
   * Constructs a new RunTagCellWidget.
   */
  private _iframe: IFrame;
  constructor(iframe: IFrame) {
    super();
    this._iframe = iframe;
    this.addClass('jp-ReactWidget');

  }
  render(): JSX.Element {
    return (<Preview iframe={this._iframe}/>);
  }
}