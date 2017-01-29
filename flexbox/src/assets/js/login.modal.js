const LoginModal = React.createClass({

  getInitialState: function() {
    return {
      panels: [
        {
          name: 'login',
          btnText: 'Log In',
          h1: 'Welcome Back'
        },
        {
          name: 'join', 
          btnText: 'Continue',
          h1: 'Create Account'
        }
      ],
      activeSwitcher: 'login',
      revealPW: true
    };
  },

  _fadeOutIn: function () {
    let inputs = document.getElementById('app-login-modal-body');
    let tl = new TimelineMax();
    tl.to( inputs , 0.350, {
        opacity: 0
      })
      .to( inputs , 0.350, {
        opacity: 1
      }, "-=0.175");
  },

  _handleSwitcherClick: function ( e ) {
    e.preventDefault();
    this._fadeOutIn();
    if ( e.currentTarget.textContent === 'Join' && this.state.activeSwitcher === 'login' ) {
      removeClass( this.loginLink, 'active' );
      this.setState({
        activeSwitcher: 'join'
      });
    } else if ( e.currentTarget.textContent === 'Login' && this.state.activeSwitcher === 'join' ) {
      removeClass( this.joinLink, 'active' );
      this.setState({
        activeSwitcher: 'login'
      });
    }
    addClass( e.currentTarget, 'active' );
  },

  _updateInputType: function ( input, type = 'text' ) {
    input.setAttribute( 'type', type );
  },

  _handleRevealPW: function ( e ) {
    e.preventDefault();
    if ( e.currentTarget.id === 'login-modal-reveal-pw' && this.state.revealPW === false ) {
      addClass( this.revealPW, 'active' );
      this.setState({
        revealPW: true
      });
      this._updateInputType( this.passwordInput, 'text' );
    } else if ( e.currentTarget.id === 'login-modal-reveal-pw' && this.state.revealPW === true ) {
      removeClass( this.revealPW, 'active' );
      this.setState({
        revealPW: false
      });
      this._updateInputType( this.passwordInput, 'password' );
    }
  },

  _getPasswordInput: function ( el ) {
    this.passwordInput = el;
  },

  _getRevealPW: function ( el ) {
    this.revealPW = el;
  },

  _getJoinLink: function ( el ) {
    this.joinLink = el;
  },

  _getLoginLink: function ( el ) {
    this.loginLink = el;
  },

  _getInitialOrigin: function ( opt = '50% 50%' ) {
    let origin = opt;
    if ( opt === 'top' ) origin = 'top left';
    return origin;
  },

  _handleSubmit: function ( e ) {
    e.preventDefault();
  },

  _closeLoginModal: function ( e ) {
    // only fire event if overlay was clicked directly, don't bubble
    if ( e.target.getAttribute('id') === 'app-modal-overlay' || e.currentTarget.id === 'app-modal-login-cancel' ) {
      this.props.handleLoginModal( e );
    } else {
      e.stopPropagation();
    }
  },

  _getEmailInput: function ( el ) {
    return this.emailInput = el;
  },

  _getModal: function ( el ) {
    return this.modal = el;
  },

  _getOverlay: function ( el ) {
    return this.overlay = el;
  },

  _getBgTexture: function ( el ) {
    return this.bgTexture = el;
  },

  _animateIn: function ( done ) {
    let overlay = this.overlay;
    let modal = this.modal;

    if ( this.props.pos ) {
      TweenLite.set( el, { 
        x: this.props.pos.touchX,
        y: this.props.pos.touchY
      })
    }
    TweenLite.set( modal, { 
      x: 500, 
      transformOrigin: this._getInitialOrigin()
    });
    TweenLite.set( overlay, { 
      opacity: 0,
      transformOrigin: this._getInitialOrigin()
    });
    TweenLite.to( overlay, 0.350, { 
      opacity: 1,
      backgroundColor: 'rgba(68,68,68,.8)'
     });
    TweenLite.to( modal, 0.350, { 
      x: 0,
      ease: Power2.easeInOut,
      onComplete: done
     });
  },

  _animateOut: function ( done ) {
    let overlay = this.overlay;
    let modal = this.modal;

    let tl = new TimelineMax();
    tl.to( modal, 0.350, { 
      x: -500,
      ease: Power2.easeInOut
     })  
    .to( overlay, 0.350, { 
      opacity: 0,
      backgroundColor: 'rgba(255,255,255,0)',
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

  componentDidMount: function () {
    addClass( this.loginLink, 'active' );
    this._updateInputType( this.passwordInput, 'text' );
  },

  render: function() {
    let panel = this.state.panels.filter( item  => item.name === this.state.activeSwitcher )[0];
    return (
      <div>
        <div className="app-overlay login-modal-container">
          <div ref={this._getOverlay} onClick={this._closeLoginModal} id="app-modal-overlay" key="app-overlay-modal-bg-01" className="login-modal Grid Grid--fit">           
            <form onSubmit={this._handleSubmit} ref={this._getModal} className="Grid-cell login-modal-form" noValidate>
              <section className="app-modal-header">
                <i onClick={this._closeLoginModal} className="app-modal-cancel" id="app-modal-login-cancel">
                  <CloseIcon svgId="login-modal-close-icon"/>
                </i>
                <h1 className="centered">{panel.h1}</h1>
                <div className="panel-selector">
                  <ul className="Grid Grid Grid--1of2">
                    <li className="Grid-cell" ref={ this._getJoinLink } onClick={this._handleSwitcherClick}>Join</li>
                    <li className="Grid-cell" ref={ this._getLoginLink } onClick={this._handleSwitcherClick}>Login</li>
                  </ul>
                </div>
              </section> 
              <div className="modal-body" id="app-login-modal-body">
                <div className="form-group has-feedback">
                  <label className="control-label hidden" htmlFor="email">Email</label>
                  <input ref={this._getEmailInput} className="form-control input-lg" type="text" name="email" placeholder="Email" required autoCapitalize="none" autoCorrect="off" />
                  <span className="hidden glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                  <small className="hidden error" >Email is required</small>
                </div>
                <div className="form-group has-feedback with-forgot-pw has-icon">
                  <label className="control-label sr-only" htmlFor="password">Password</label>
                  <input ref={ this._getPasswordInput } className="form-control input-lg" type="password" name="password" placeholder="Password" required autoCapitalize="none" autoCorrect="off" />
                  <span className="hidden glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                  <a href="#" title="Next"><span className="hidden next-icon"><i className="fa fa-arrow-right"></i></span></a>
                  <i id="login-modal-reveal-pw" className="reveal-pw active" ref={ this._getRevealPW } onClick={this._handleRevealPW}> 
                    <EyeIcon svgId="login-modal-eye-icon"/>
                  </i>
                  <span className="hidden forgot-pw">Forgot?</span>
                  <small className="hidden error" >Password is required</small>
                </div>
              </div>
              <div className="modal-footer Grid Grid--fit">
                <div className="Grid-cell">
                  <button className="btn btn-doll-customize-shape cancel">Cancel</button>
                </div>
                <div className="Grid-cell app-modal-login-btn">
                  <button className="btn btn-doll-customize-shape login-modal" type="submit">{panel.btnText}</button>
                </div>
                <div className="Grid-cell Grid-break"></div> 
                <div className="Grid-cell join-us">  
                  <h3>New around here? <span className="bold-text">Join us</span></h3>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div ref={this._getBgTexture} key="app-overlay-bg-01" id="app-bg-texture" />
      </div>
    );
  }
});