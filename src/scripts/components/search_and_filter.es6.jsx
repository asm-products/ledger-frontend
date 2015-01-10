import Filter from 'components/filter';
import React from 'react';
import Search from 'components/search';

export default React.createClass({
  propTypes: {
    onFilter: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Search and filter

          <div className="pull-right">
            {this.renderPanelButton()}
          </div>
        </div>

        {this.renderPanelBody()}
      </div>
    );
  },
  renderPanelButton: function () {
    var icon = this.state.isOpen ? 'minus' : 'plus';
    var className = ['glyphicon', 'glyphicon-' + icon].join(' ');

    return (
      <button className="btn btn-default btn-xs">
        <span className={className} onClick={this.toggleOpen} />
      </button>
    );
  },
  renderPanelBody: function () {
    if (!this.state.isOpen) { return; }

    return (
      <div className="panel-body">
        <Search onSearch={this.props.onSearch} />
        <Filter onFilter={this.props.onFilter} />
      </div>
    );
  },

  getInitialState: function () {
    return { isOpen: false };
  },

  toggleOpen: function () {
    this.setState({ isOpen: !this.state.isOpen });
  }
});
