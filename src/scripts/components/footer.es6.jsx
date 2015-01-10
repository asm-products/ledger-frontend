import React from 'react';

export default React.createClass({
  propTypes: {
    backendVersion: React.PropTypes.string,
    frontendVersion: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className="container">
        <ul className="list-inline text-center">
          <li>
            <a href="https://github.com/asm-products/ledger-frontend">
              ledger-frontend
            </a>
            {' ' + this.frontendVersion()}
          </li>

          <li>
            <a href="https://github.com/asm-products/ledger-backend">
              ledger-backend
            </a>
            {' ' + this.backendVersion()}
          </li>
        </ul>
      </div>
    );
  },

  backendVersion: function () {
    return this.props.backendVersion || 'unknown';
  },

  frontendVersion: function () {
    return this.props.frontendVersion;
  }
});
