import React from 'react';

export default React.createClass({
  propTypes: {
    onSearch :React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            onChange={this.handleChange}
            placeholder="Search"
            ref="query"
            type="search"
            />
        </div>
      </form>
    );
  },

  handleChange: function() {
    this.props.onSearch(this.refs.query.getDOMNode().value);
  },
  handleSubmit: function (event) {
    event.preventDefault();
  }
});
