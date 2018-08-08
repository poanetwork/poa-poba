import React from 'react';

import { Link } from 'react-router-dom';
import buttonStyle from '../styles/button'
import align from '../styles/align'

export default () => (
    <Link to="/">
      <button style={buttonStyle}>
        Back
        <span style={align.iconRight}>
        <i className="fa fa-undo" />
      </span>
      </button>
    </Link>
);
