import Entry from 'components/entry';
import React from 'react';

export default React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="list-group">
        {this.renderEntries()}
      </div>
    );
  },
  renderEntries: function() {
    return this.props.entries.map(function(entry) {
      return (
        <div className="list-group-item" key={entry.id}>
          <Entry
            amount={entry.amount}
            time={entry.time}
            description={entry.description}
            id={entry.id}
            onUpdate={this.props.onUpdate}
            onDelete={this.props.onDelete}
            />
        </div>
      );
    }.bind(this));
  },
});
