import EditEntryForm from 'components/edit_entry_form';
import React from 'react';
import ShowEntry from 'components/show_entry';

export default React.createClass({
  propTypes: {
    amount: React.PropTypes.number.isRequired,
    time: React.PropTypes.instanceOf(Date).isRequired,
    description: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    if (this.state.isEditing) {
      return this.renderEdit();
    }
    else {
      return this.renderShow();
    }
  },
  renderEdit: function() {
    return (
      <EditEntryForm
        amount={this.props.amount}
        description={this.props.description}
        id={this.props.id}
        onUpdate={this.onUpdate}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
        time={this.props.time}
        />
    );
  },
  renderShow: function() {
    return (
      <ShowEntry
        amount={this.props.amount}
        time={this.props.time}
        description={this.props.description}
        onClick={this.onClick}
        />
    );
  },
  getInitialState: function() {
    return {isEditing: false};
  },

  onClick: function(event) {
    event.preventDefault();
    this.setState({isEditing: true});
  },
  onUpdate: function(entry) {
    this.setState({isEditing: false});
    this.props.onUpdate(entry);
  },
  onCancel: function() {
    this.setState({isEditing: false});
  },
  onDelete: function() {
    this.setState({isEditing: false});
    this.props.onDelete(this.props);
  }
});
