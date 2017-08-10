/**
*
* MyCustomWidget
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';

import messages from './messages';

function MyCustomWidget() {
  const magic = () => alert('Hello!');
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <button onClick={magic}>Magic</button>
    </div>
  );
}

MyCustomWidget.propTypes = {

};

export default MyCustomWidget;
