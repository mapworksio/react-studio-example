/**
 *
 * Studio
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MyCustomWidget from 'components/MyCustomWidget';

import Providers from '../../Providers';

import Wrapper from './Wrapper';

class Studio extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      toLoad: global.Studio ? 0 : 2,
    };
  }

  componentDidMount() {
    if (!global.Studio) {
      const onLoad = () => {
        this.setState({ toLoad: this.state.toLoad - 1 });
        return this.state.toLoad || this.renderStudio();
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.props.jsUrl || '';
      script.onload = onLoad;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = this.props.cssUrl || '';
      link.rel = 'stylesheet';
      link.onload = onLoad;
      document.head.appendChild(link);
    } else {
      this.renderStudio();
    }
  }

  initTool() {
    const toolbar = this.map.getControl('toolbar');
    const { _, Backbone } = global.Studio;
    const TabModel = _.findValue(
      global.Studio,
      [
        'app',
        'component',
        'panel',
        'tab',
        'Model',
      ].join('.')
    );

    const MyView = Backbone.View.extend({
      template: '<div class="widget-container"></div>',
      render() {
        this.$el.html(this.template);
        ReactDOM.render(
          <Providers>
            <MyCustomWidget />
          </Providers>,
          this.$('.widget-container').get(0)
        );
        return this;
      },
    });

    toolbar.collection.add(
      new TabModel({
        id: 'widget',
        title: 'Widget',
        iconClass: 'glyphicon glyphicon-ice-lolly',
        view: new MyView().render(),
      }),
      { at: 3 }
    );
  }

  renderStudio() {
    const conf = {
      map: this.props.mapId,
      mode: global.Studio.core.Map.Mode.MAP,
      resourcesPath: this.props.resourceUrl,
      mapPath: this.props.mapUrl,
      studioPath: this.props.studioUrl,
      navigationControl: false,
      scaleControl: true,
      toolbarControl: true,
      zoomControl: false,
      challenge: this.props.challenge,
      mapworksPeliasPath: this.props.peliasPath,
      mapworksSessionPath: this.props.sessionPath,
    };

    this.map = new global.Studio.core.Map(
      document.getElementsByClassName('studio-container'),
      conf
    )
    .load((err, map) => (
      err
      ? this._onLoadError(err)
      : map.once('ready', () => {
        global.Studio.app.App.init(
          global.Studio,
          map,
          conf
        );
        this.initTool();
      })
    ));

    global.map = this.map;
  }

  render() {
    return (
      <Wrapper className="studio-container" />
    );
  }
}

Studio.defaultProps = {
  jsUrl: 'https://api.dev.mapworks.io/studio/latest/js/studio-core.js',
  cssUrl: 'https://api.dev.mapworks.io/studio/latest/css/studio-core.css',
  resourceUrl: 'https://api.dev.mapworks.io/resources',
  mapUrl: 'https://api.dev.mapworks.io/maps/latest',
  studioUrl: 'https://api.dev.mapworks.io/studio/latest',
  mapId: 'AVLi4IKVzzDc1QqSK-km',
  challenge: 'lky',
  peliasPath: 'https://pelias.dev.mapworks.io',
  sessionPath: 'https://app.dev.mapworks.io/users/plugins/mapworks/getLoginStatus.php',
};

Studio.propTypes = {
  jsUrl: React.PropTypes.string,
  cssUrl: React.PropTypes.string,
  resourceUrl: React.PropTypes.string,
  mapUrl: React.PropTypes.string,
  studioUrl: React.PropTypes.string,
  mapId: React.PropTypes.string,
  challenge: React.PropTypes.string,
  peliasPath: React.PropTypes.string,
  sessionPath: React.PropTypes.string,
};

export default Studio;
