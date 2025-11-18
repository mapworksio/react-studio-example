import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './App.css';

import CustomWidget from './CustomWidget';

const Studio = (window as any).Studio;

const config = {
  map: 'AXBR6sWIAAA2ac12AAAA',
  mapworksPath: 'https://app.mapworks.io',
  access: Studio.core.Map.Access.ANONYMOUS,
  navigationControl: false,
  scaleControl: true,
  toolbarControl: true,
  zoomControl: false,
  downloadUserSettings: false,
  mapworksLoginProvider: {
    client_id: '3mvor82v8k8f6nbi4f8bpihsom',
    popup_redirect_uri: 'http://localhost:8080/openId.html',
    anonymousUser: 'noreply@public-anonymous.mapworks.io',
  }
};

function App() {
  const container = useRef(null)
  const [ map, setMap ] = useState<any>(null);

  useEffect(() => {
    if (!container?.current) return;
    const m = Studio.init(container.current, config)
    .once('ready', () => setMap(m));
  }, [container])

  useEffect(() => {
    if (!map) return;
    
    const toolbar = map.getControl('toolbar');

    const TabModel = Studio.app.component.panel.tab.Model;

    // Create custom widget container view
    const view = new Studio.Backbone.View().render();

    // Add it to toolbar
    toolbar.collection.add(
      new TabModel({
        id: 'widget',
        title: 'Widget',
        iconClass: 'glyphicon glyphicon-ice-lolly',
        view,
      }),
      { at: 3 }
    );

    view.once('show', () => {
      // Get the element to attach the view
      const { el } = view;

      createRoot(el).render(<CustomWidget />);
    });
  }, [map]);

  return (
    <div ref={container} className="container"></div>
  );
}

export default App;
