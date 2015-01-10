import React from 'react';

export default React.createClass({
  propTypes: {
    onFilter: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <form>
        <div className="row">
          <div className="form-group col-xs-6">
            <input
              className="form-control"
              onChange={this.handleChange}
              placeholder="After"
              ref="after"
              type="date"
              />
          </div>

          <div className="form-group col-xs-6">
            <input
              className="form-control"
              onChange={this.handleChange}
              placeholder="Before"
              ref="before"
              type="date"
              />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-xs-6">
            <div className="input-group">
              <div className="input-group-addon">
                $
              </div>

              <input
                className="form-control"
                onChange={this.handleChange}
                placeholder="Minimum"
                ref="minimum"
                step="any"
                type="number"
                />
            </div>
          </div>

          <div className="form-group col-xs-6">
            <div className="input-group">
              <div className="input-group-addon">
                $
              </div>

              <input
                className="form-control"
                onChange={this.handleChange}
                placeholder="Maximum"
                ref="maximum"
                step="any"
                type="number"
                />
            </div>
          </div>
        </div>
      </form>
    );
  },

  handleChange: function() {
    var afterNode = this.refs.after.getDOMNode();
    var after = afterNode.valueAsDate ||
      new Date(Date.parse(afterNode.value));

    var beforeNode = this.refs.before.getDOMNode();
    var before = beforeNode.valueAsDate ||
      new Date(Date.parse(beforeNode.value));

    var minimum = this.refs.minimum.getDOMNode().valueAsNumber;
    var maximum = this.refs.maximum.getDOMNode().valueAsNumber;

    this.props.onFilter(after, before, minimum, maximum);
  }
});
