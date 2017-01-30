const AppHeader = React.createClass({

  getInitialState: function() {
    return {

    };
  },

  _getInitialOrigin: function ( opt = '50% 50%' ) {
    let origin = opt;
    if ( opt === 'top' ) origin = 'top left';
    return origin;
  },

  _openLoginModal: function ( e ) {
    this.props.handleLoginModal( e );
  },

  _handleTouchStart: function ( e ) {
    //@todo refactor to inline styling here, remove dependance on stylesheet?
    addClass( e.currentTarget, 'active' );
  },

  _handleTouchEnd: function ( e ) {
    //@todo ditto handleTouchStart
    removeClass( e.currentTarget, 'active' );
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
      y: -50, 
      transformOrigin: this._getInitialOrigin()
    });
    TweenLite.to( el, 0.350, { 
      opacity: 1,
      y: 0,
      ease: Power2.easeInOut,
      onComplete: done
     });
  },

  _animateOut: function ( done ) {
    let el = ReactDOM.findDOMNode( this );
    TweenLite.to( el, 0.350, { 
      opacity: 0,
      x: -50, 
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
    let { modalActive } = this.props;
    let contentBlur = ( modalActive ) ? "app-content-blur" : "";
    let acctActive = ( this.state.accountActive ) ? "Grid-cell active" : "Grid-cell";
    return (
      <header id="home-header" className={contentBlur}>
        <div id="home-header-content" className="Grid Grid-fit">
          <section onTouchStart={this._handleTouchStart} onTouchEnd={this._handleTouchEnd} id="home-header-logo" className="Grid-cell">
            <div className="home-header-item-container logo">
              <LogoType svgId="home-header-logotype"/>
            </div>
          </section>
          <section id="home-header-separator" className="Grid-cell">
          </section>
          <section onTouchStart={this._handleTouchStart} onTouchEnd={this._handleTouchEnd} onClick={this._openLoginModal} id="home-header-account" className={acctActive}>
            <div className="home-header-item-container">
              <UserIcon svgId="home-header-account-icon"/>
              <span className="home-header-icon-label login">LogIn</span>
            </div>
          </section>
          <section onTouchStart={this._handleTouchStart} onTouchEnd={this._handleTouchEnd} id="home-header-cart" className="Grid-cell">
            <div className="home-header-item-container">
              <CartIcon svgId="home-header-cart-icon"/>
              <span className="home-header-icon-label cart">Cart</span>
            </div>
          </section>
        </div>
      </header>
    );
  }
});