const Screen = React.createClass({

  componentDidMount: function () {
    console.log('i did mount woot!');
  },

  _getInitialOrigin: function ( opt = '50% 50%' ) {
    let origin = opt;
    if ( opt === 'top' ) origin = 'top left';
    return origin;
  },

  _animateIn: function ( done ) {
    let el = ReactDOM.findDOMNode( this );

    if ( this.props.pos ) {
      TweenLite.set( el, { 
        x: this.props.pos.touchX,
        y: this.props.pos.touchY
      })
    }

    TweenLite.set( el, { 
      opacity: 0, 
      scaleX: 0, 
      scaleY: 0,
      transformOrigin: this._getInitialOrigin()
    });
    TweenLite.to( el, 0.350, { 
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      onComplete: done
     });
  },

  _animateOut: function ( done ) {
    let el = ReactDOM.findDOMNode( this );
    TweenLite.to( el, 0.350, { 
      opacity: 0,
      scaleX: 5, 
      scaleY: 5,
      transformOrigin: this._getInitialOrigin(),
      onComplete: done
     });
  },

  componentWillAppear: function ( done ) {
    this._animateIn( done );
  },

  componentWillEnter: function ( done ) {
    console.log('entering now...');
    this._animateIn( done );
  },

  componentWillLeave: function ( done ) {
    console.log('leaving now...');
    this._animateOut( done );
  },

  render: function() { 
    return (
      <h1>{ this.props.item }</h1>
    )
  }

});