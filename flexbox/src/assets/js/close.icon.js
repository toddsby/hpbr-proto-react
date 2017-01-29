const CloseIcon = React.createClass({
  
  render: function() {
    let { svgId } = this.props;
    return (
      <svg viewBox="0 0 100 125" preserveAspectRatio="xMinYMin meet">
        <g id={ svgId }>
          <title>Close</title>
          <description>Visual representation of an x</description>
          <polygon points="85.7,15 85,14.3 49.7,49.6 14.4,14.3 13.6,15 49,50.3 13.6,85.6 14.4,86.4 49.7,51 85,86.4 85.7,85.6 50.4,50.3"/>
        </g>
      </svg>
    );
  }

});