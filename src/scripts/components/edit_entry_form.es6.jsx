import EntryForm from 'components/entry_form';
import React from 'react';

export default React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    time: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    return (
      <EntryForm
        amount={this.props.amount}
        description={this.props.description}
        id={this.props.id}
        onUpdate={this.props.onUpdate}
        onCancel={this.props.onCancel}
        onDelete={this.props.onDelete}
        time={this.props.time}
        />
    );
  }
});
