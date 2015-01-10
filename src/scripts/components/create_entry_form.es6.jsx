import EntryForm from 'components/entry_form';
import React from 'react';

export default React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Create an entry

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
        <EntryForm onCreate={this.props.onCreate} />
      </div>
    );
  },

  getInitialState: function () {
    return {
      isOpen: true
    };
  },

  toggleOpen: function () {
    this.setState({ isOpen: !this.state.isOpen });
  }
});
