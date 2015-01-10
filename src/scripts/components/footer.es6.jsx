import React from 'react';

export default React.createClass({
  propTypes: {
    backEndVersion: React.PropTypes.string,
    frontEndVersion: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className="container">
        <ul className="list-inline text-center">
          <li>
            <a href="https://github.com/tfausak/ledger-react">
              ledger-react
            </a>
            {' ' + this.frontEndVersion()}
          </li>

          <li>
            <a href="https://github.com/tfausak/ledger-api">
              ledger-api
            </a>
            {' ' + this.backEndVersion()}
          </li>
        </ul>
      </div>
    );
  },

  backEndVersion: function () {
    return this.props.backEndVersion || 'unknown';
  },

  frontEndVersion: function () {
    return this.props.frontEndVersion;
  }
});
