import './iframe.css'

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

// import App from '../App'

storiesOf('Same Page', module)
  .add('Test', () => (
    <iframe className="sp-chatbox-iframe" src="http://localhost:3000" />
  ));
