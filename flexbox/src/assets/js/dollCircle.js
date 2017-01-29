const DollCircle = React.createClass({
  
  render: function() {
    let { imgSrc } = this.props;
    return (
      <svg viewBox="0 0 163 163" preserveAspectRatio="xMinYMin meet">
        <defs>
        <clipPath id="dollImageCrop">
          <circle id="dollCircleCrop" cx="83.5" cy="83.5" r="75"/>
        </clipPath>
        <circle id="dollBeforeCircle" cx="84.5" cy="81.5" r="78.5"/>
        <circle id="dollAfterCircle" cx="78" cy="78" r="75" fill="rgba(255,255,255, 0)" strokeDasharray="7,5"/>
        </defs>
        <use xlinkHref="#dollBeforeCircle" className="background" fill="#A2E9B1" />
        <g id="dollImageMask" clipPath="url(#dollImageCrop)">
          <image xlinkHref={ imgSrc } x="5.5" y="5.5" height="155" width="155" />
        </g>
        <use xlinkHref="#dollAfterCircle" className="foreground" stroke="#e6e6e6" strokeWidth="2"/>
      </svg>
    );
  }

});