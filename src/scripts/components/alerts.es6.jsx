import React from 'react';

export default React.createClass({
  propTypes: {
    connectionStatus: React.PropTypes.string.isRequired,
    createKey: React.PropTypes.func.isRequired,
    enterKey: React.PropTypes.func.isRequired,
    keyStatus: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div className="container">
        {this.connectionStatusAlert()}
        {this.keyStatusAlert()}
      </div>
    );
  },

  connectionStatusAlert: function () {
    switch (this.props.connectionStatus) {
      case 'disconnected': return this.connectionStatusDisconnectedAlert();
      case 'connecting': return this.connectionStatusConnectingAlert();
      case 'connected': return;
    }
  },
  connectionStatusDisconnectedAlert: function () {
    return (
      <div className="alert alert-danger">
        <strong>Disconnected.</strong>
        {' '}
        Unable to connect to the back end.
      </div>
    );
  },
  connectionStatusConnectingAlert: function () {
    return (
      <div className="alert alert-info">
        <strong>Connecting.</strong>
        {' '}
        Attempting to connect to the back end.
      </div>
    );
  },

  keyStatusAlert: function () {
    if (this.props.connectionStatus !== 'connected') { return; }

    switch (this.props.keyStatus) {
      case 'missing': return this.keyStatusMissingAlert();
      case 'invalid': return this.keyStatusInvalidAlert();
      case 'valid': return;
    }
  },
  keyStatusMissingAlert: function () {
    return (
      <div className="alert alert-warning">
        <strong>Missing key.</strong>
        {' Either '}
        <a className="alert-link" href="#" onClick={this.props.createKey}>
          create a new key
        </a>
        {' or '}
        <a className="alert-link" href="#" onClick={this.props.enterKey}>
          enter an existing key
        </a>
        .
      </div>
    );
  },
  keyStatusInvalidAlert: function () {
    return (
      <div className="alert alert-danger">
        <strong>Invalid key.</strong>
        {' Either '}
        <a className="alert-link" href="#" onClick={this.props.createKey}>
          create a new key
        </a>
        {' or '}
        <a className="alert-link" href="#" onClick={this.props.enterKey}>
          enter a different key
        </a>
        .
      </div>
    );
  }
});
