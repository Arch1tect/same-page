import './iframe.css'

import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Same Page', module)
  .add('Test', () => (
    <iframe className="sp-chatbox-iframe" src="http://localhost:3000" />
  ));
