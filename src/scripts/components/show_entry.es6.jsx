import React from 'react';

export default React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    time: React.PropTypes.instanceOf(Date).isRequired,
    description: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div className="entry" onClick={this.props.onClick}>
        <div className="lead">
          <div className="pull-right">
            <div className={this.getClassNames()}>
              ${this.props.amount.toFixed(2)}
            </div>
          </div>

          {this.props.description}
        </div>

        <div>
          {this.props.time.toLocaleString()}
        </div>
      </div>
    );
  },

  getClassNames: function() {
    return ['label', 'label-' + this.getClassName()].join(' ');
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
    return this.props.amount < 0;
  },
  isDebit: function() {
    return this.props.amount > 0;
  }
});
