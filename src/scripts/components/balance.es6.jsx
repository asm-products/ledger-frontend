import React from 'react';

export default React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <h1 className="text-center">
        Balance
        {' '}
        <span className={['label', 'label-' + this.getClassName()].join(' ')}>
          ${this.getBalance().toFixed(2)}
        </span>
      </h1>
    );
  },

  getBalance: function() {
    return this.props.entries.map(function(entry) {
      return entry.amount;
    }).reduce(function(a, b) {
      return a + b;
    }, 0);
  },
  getClassName: function() {
    if (this.isCredit()) {
      return 'danger';
    }
    if (this.isDebit()) {
      return 'success';
    }

    return 'default';
  },
  isCredit: function() {
    return this.getBalance() < 0;
  },
  isDebit: function() {
    return this.getBalance() > 0;
  }
});
