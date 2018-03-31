import {
  ICommandPalette
} from '@jupyterlab/apputils';
import {
  Widget
} from '@phosphor/widgets';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_xkcd extension.
 */
const extension: JupyterLabPlugin<void> = {
    id: 'jupyterlab_xkcd',
    autoStart: true,
    requires: [ICommandPalette],
    activate: (app: JupyterLab, palette: ICommandPalette) => {
        console.log('JupyterLab extension jupyterlab_xkcd is activated!');
        let widget: Widget = new Widget();
        widget.id = 'xkcd-jupyterlab';
        widget.title.label = 'xkcd.com';
        widget.title.closable = true;

        // Add an application command
        const command: string = 'xkcd:open';
        app.commands.addCommand(command, {
            label: 'Random xkcd comic',
            execute: () => {
                if (!widget.isAttached) {
                    // Attach the widget to the main work area if it's not there
                    app.shell.addToMainArea(widget);
                }
                // Activate the widget
                app.shell.activateById(widget.id);
            }
        });

        // Add the command to the palette.
        palette.addItem({command, category: 'Tutorial'});
        console.log('ICommandPalette:', palette);  }
};

export default extension;
