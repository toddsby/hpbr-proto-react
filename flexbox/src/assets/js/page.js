// !! NOTE: babel standalone doesn't 
// transpile es2015 arrow functions correctly
// using function literals here instead !!

const Page = React.createClass({

  getInitialState: function() {
    return {
      items: ['Howdy Pardner!']
    };
  },

  _getButtonPos: function ( el ) {
    let xPos = 0,
    yPos = 0;

    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPos += (el.offsetTop - el.scrollTop + el.clientTop);

   this._button = {
      dimensions: {
        height: el.offsetHeight,
        width: el.offsetWidth
      },
      pos: {
        x: xPos,
        y: yPos
      }
    }; 
  },

  _getButton: function ( el ) {
    this._getButtonPos( el );
  },

  _handleTouchStart: function ( e ) {
    this._coords = {};
    this._coords.touchX = e.touches[0].pageX - this._button.pos.x - (this._button.dimensions.height / 2 );
    this._coords.touchY = e.touches[0].pageY - this._button.pos.y - (this._button.dimensions.width / 2);
    // enables active state animation on buttons for iOS

  },

  _handleClick: function ( e ) {
    if (this.state.items.length > 0 )
      this.setState({ items: [] });
    else {
      this.setState({ items: ['Howdy Pardner!'] });
    }
  },

  _animateIn: function ( done ) {
    let el = ReactDOM.findDOMNode( this );
    TweenLite.set( el, { 
      opacity:0
    });
    TweenLite.to( el, 1, { 
      opacity: 1,
      onComplete: done
     });
  },

  _animateOut: function ( done ) {
    let el = ReactDOM.findDOMNode( this );
    TweenLite.to( el, 1, { 
      opacity: 0,
      onComplete: done
     });
  },

  componentWillAppear: function ( done ) {
    this._animateIn( done );
  },

  componentWillEnter: function ( done ) {
    this._animateIn( done );
  },

  componentWillLeave: function ( done ) {
    this._animateOut( done  )
  },

  render: function () { 
    const screens = this.state.items.map( ( item, idx ) => ( <Screen key={idx} item={item} pos={this._coords}/> ) );
    return (
      <div>
        <div className="btn-contain">
          <button ref={this._getButton} className="btn btn-doll-customize-shape" onTouchStart={this._handleTouchStart} onClick={this._handleClick}>Go</button>
        </div>
        <React.addons.TransitionGroup component="div">
          { screens }
        </React.addons.TransitionGroup>
      </div>
    );
  }

});