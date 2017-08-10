/**
 * Providers.js
 *
 * Setup singleton provider.
 */
import React from 'react';
import { Provider } from 'react-redux';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

const store = configureStore({});

function Providers(props) {
  return (
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        {props.children}
      </LanguageProvider>
    </Provider>
  );
}

Providers.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Providers;
