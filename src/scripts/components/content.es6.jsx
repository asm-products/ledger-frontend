import Balance from 'components/balance';
import CreateEntryForm from 'components/create_entry_form';
import Entries from 'components/entries';
import React from 'react';
import SearchAndFilter from 'components/search_and_filter';

export default React.createClass({
  propTypes: {
    entries: React.PropTypes.array.isRequired,
    onCreateEntry: React.PropTypes.func.isRequired,
    onUpdateEntry: React.PropTypes.func.isRequired,
    onDeleteEntry: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Balance entries={this.filteredEntries()} />
            <hr />
            <CreateEntryForm onCreate={this.props.onCreateEntry} />
            <SearchAndFilter
              onSearch={this.handleSearch}
              onFilter={this.handleFilter} />
          </div>

          <div className="col-sm-8">
            <Entries
              entries={this.sortedEntries()}
              onUpdate={this.props.onUpdateEntry}
              onDelete={this.props.onDeleteEntry}
              />
          </div>
        </div>
      </div>
    );
  },
  getInitialState: function() {
    return {
      after: null,
      before: null,
      maximum: undefined,
      minimum: undefined,
      query: ''
    };
  },

  handleFilter: function(after, before, minimum, maximum) {
    this.setState({
      after: after,
      before: before,
      maximum: maximum,
      minimum: minimum
    });
  },
  handleSearch: function(query) {
    this.setState({query: query});
  },

  filteredEntries: function() {
    return this.props.entries.filter(function(entry) {
      if (this.state.query) {
        var haystack = entry.description.toLowerCase();
        var needle = this.state.query.toLowerCase();
        if (haystack.indexOf(needle) === -1) {
          return false;
        }
      }

      if (this.state.after) {
        if (entry.time < this.state.after) {
          return false;
        }
      }

      if (this.state.before) {
        if (entry.time > this.state.before) {
          return false;
        }
      }

      if (!isNaN(this.state.minimum)) {
        if (entry.amount < this.state.minimum) {
          return false;
        }
      }

      if (!isNaN(this.state.maximum)) {
        if (entry.amount > this.state.maximum) {
          return false;
        }
      }

      return true;
    }.bind(this));
  },
  sortedEntries: function() {
    return this.filteredEntries().sort(function(a, b) {
      return b.time - a.time;
    });
  }
});
