import * as React from 'react';
import { createPortal } from 'react-dom';

import { copyStyles } from './utils';

const WindowPortal = ({ children, closeWindowPortal }) => {
  const [container, setContainer] = React.useState(null);
  const newWindow = React.useRef(window);

  React.useEffect(() => {
    const div = document.createElement('div');
    setContainer(div);
  }, []);

  React.useEffect(() => {
    if (container) {
      newWindow.current = window.open(
        '',
        '',
        'width=600,height=400,left=200,top=200,popup'
      );

      newWindow.current.document.body.appendChild(container);
      copyStyles(document, newWindow.current.document);
      newWindow.current.addEventListener('beforeunload', () =>
        closeWindowPortal()
      );

      return () => newWindow.current.close();
    }
  }, [closeWindowPortal, container]);

  return container && createPortal(children, container);
};

export { WindowPortal };
