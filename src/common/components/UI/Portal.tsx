import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

let portalRoot = document.getElementById('portal-root');

const Portal = ({ children }: PortalProps) => {
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root';
    document.body.append(portalRoot);
  }

  return ReactDOM.createPortal(<>{children}</>, portalRoot);
};

export default Portal;
