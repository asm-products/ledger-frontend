import React from 'react';

export default React.createClass({
  propTypes: {
    amount: React.PropTypes.number,
    description: React.PropTypes.string,
    id: React.PropTypes.number,
    onCreate: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    time: React.PropTypes.instanceOf(Date)
  },

  render: function() {
    return (
      <form id="entry-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="amount">
            Amount
          </label>

          <div className="input-group">
            <div className="input-group-addon">
              $
            </div>

            <input
              className="form-control"
              defaultValue={this.getDefaultAmount()}
              id="amount"
              min="0"
              placeholder="7.31"
              ref="amount"
              step="any"
              type="number"
              />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Name
          </label>

          <input
            className="form-control"
            defaultValue={this.props.description}
            id="description"
            placeholder="Lunch at Freebirds"
            ref="description"
            type="text"
            />
        </div>

        {this.renderButtons()}
      </form>
    );
  },
  renderButtons: function() {
    if (this.isEditing()) {
      return (
        <div className="btn-group">
          <button className="btn btn-primary" type="submit">
            Update
          </button>

          <button
            className="btn btn-default"
            onClick={this.onCancel}
            type="button"
            >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={this.onDelete}
            type="button"
            >
            Delete
          </button>
        </div>
      );
    }
    else {
      return (
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      );
    }
  },

  onSubmit: function(event) {
    event.preventDefault();

    var amountNode = this.refs.amount.getDOMNode();
    var amount = amountNode.valueAsNumber;
    var nameNode = this.refs.description.getDOMNode();
    var description = nameNode.value;

    if (isNaN(amount) || !isFinite(amount)) {
      amountNode.focus();
      return;
    }

    if (!description) {
      nameNode.focus();
      return;
    }

    var entry = {amount: amount, description: description, time: new Date()};

    if (this.isEditing()) {
      entry = {
        amount: entry.amount,
        description: entry.description,
        id: this.props.id,
        time: this.props.time
      };
      this.props.onUpdate(entry);
    }
    else {
      this.props.onCreate(entry);

      var nodes = document
        .querySelectorAll('#entry-form input, #entry-form button');
      for (var i = 0; i < nodes.length; i += 1) {
        nodes.item(i).blur();
      }

      amountNode.value = '';
      nameNode.value = '';
    }
  },
  onCancel: function(event) {
    event.preventDefault();
    this.props.onCancel();
  },
  onDelete: function(event) {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.props.onDelete();
    }
  },

  isEditing: function() {
    return this.props.onUpdate;
  },

  getDefaultAmount: function() {
    if (this.props.amount === undefined) {
      return null;
    } else {
      return this.props.amount.toFixed(2);
    }
  }
});
