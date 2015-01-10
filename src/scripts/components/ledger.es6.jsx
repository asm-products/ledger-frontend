import Alerts from 'components/alerts';
import Content from 'components/content';
import Footer from 'components/footer';
import Header from 'components/header';
import React from 'react';
import superagent from 'superagent';

export default React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <Alerts
          connectionStatus={this.state.connectionStatus}
          createKey={this.createKey}
          enterKey={this.enterKey}
          keyStatus={this.state.keyStatus} />
        <Content
          entries={this.state.entries}
          onCreateEntry={this.createEntry}
          onUpdateEntry={this.updateEntry}
          onDeleteEntry={this.deleteEntry} />
        <Footer
          backEndVersion={this.state.backEndVersion}
          frontEndVersion={this.state.frontEndVersion} />
      </div>
    );
  },

  getInitialState: function () {
    return {
      backEndVersion: undefined,
      backEndURL: window.LEDGER_API_URL,
      // disconnected, connecting, connected
      connectionStatus: 'disconnected',
      entries: [],
      frontEndVersion: window.LEDGER_REACT_VERSION,
      key: window.localStorage.getItem('key'),
      // missing, invalid, valid
      keyStatus: 'missing'
    };
  },

  componentWillMount: function () {
    this.updateConnectionStatus();
  },

  updateConnectionStatus: function () {
    var url = this.buildUrl('');

    if (this.state.connectionStatus === 'disconnected') {
      this.setState({ connectionStatus: 'connecting' });
    }

    superagent.get(url, function (_, response) {
      var timeout;

      if (response && response.status === 200) {
        timeout = 5000;
        this.setState({
          backEndVersion: response.body.version,
          connectionStatus: 'connected'
        });
        this.updateKeyStatus();
      } else {
        timeout = 1000;
        this.setState({
          backEndVersion: undefined,
          connectionStatus: 'disconnected'
        });
      }

      window.setTimeout(this.updateConnectionStatus, timeout);
    }.bind(this));
  },
  updateKeyStatus: function () {
    if (this.state.key) {
      var url = this.buildUrl('keys/' + this.state.key);

      superagent.get(url, function (_, response) {
        if (response && response.status === 200) {
          this.setState({ keyStatus: 'valid' });
          this.updateEntries();
        } else {
          this.setState({ keyStatus: 'invalid' });
        }
      }.bind(this));
    } else {
      this.setState({ keyStatus: 'missing' });
    }
  },

  buildUrl: function (path) {
    var url = this.state.backEndURL + '/' + path;
    if (this.state.key) { url += '?key=' + this.state.key; }
    return url;
  },

  createKey: function () {
    var url = this.buildUrl('keys');

    superagent.post(url, function (_, response) {
      if (response && response.status === 201) {
        var key = response.body.id;
        window.alert('Your new key is: ' + key);
        this.setKey(key);
      }
    }.bind(this));
  },
  enterKey: function () {
    var key = window.prompt('Enter your key:', '');
    if (key) { this.setKey(key); }
  },
  setKey: function (key) {
    this.setState({ key: key }, this.updateKeyStatus);
    window.localStorage.setItem('key', key);
  },

  updateEntries: function () {
    var url = this.buildUrl('entries');

    superagent.get(url, function (_, response) {
      if (response && response.status === 200) {
        var entries = response.body.map(this.transformEntry);
        this.setState({ entries: entries });
      }
    }.bind(this));
  },
  createEntry: function (entry) {
    var url = this.buildUrl('entries');

    superagent.post(url, entry, function (_, response) {
      if (response && response.status === 201) {
        var newEntry = this.transformEntry(response.body);
        this.setState({ entries: [newEntry].concat(this.state.entries) });
      }
    }.bind(this));
  },
  updateEntry: function (entry) {
    var url = this.buildUrl('entries/' + entry.id);

    superagent.put(url, entry, function (response) {
      if (response && response.status === 201) {
        var updatedEntry = this.transformEntry(response.body);
        var updatedEntries = this.state.entries.map(function (e) {
          if (e.id === updatedEntry.id) { return updatedEntry; }
          else { return e; }
        });
        this.setState({ entries: updatedEntries });
      }
    }.bind(this));
  },
  deleteEntry: function (entry) {
    var url = this.buildUrl('entries/' + entry.id);
    superagent.del(url, function (_, response) {
      if (response && response.status === 200) {
        var updatedEntries = this.state.entries.filter(function (e) {
          return e.id !== entry.id;
        });
        this.setState({ entries: updatedEntries });
      }
    }.bind(this));
  },
  transformEntry: function (object) {
    return {
      amount: object.amount,
      time: new Date(object.time),
      description: object.description,
      id: object.id
    };
  }
});
