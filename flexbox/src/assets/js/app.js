const App = React.createClass({

  getInitialState: function() {
    return {
      loginModalActive: false
    };
  },

  _toggleLoginModal: function( e ) {
    this.setState({
      loginModalActive: !this.state.loginModalActive
    });
    // prevent scroll on touch device
    if ( !this.state.loginModalActive ) {
      addClass( document.documentElement, 'lock-for-modal' );
      addClass( document.body,'lock-for-modal' );
    } else {
      removeClass( document.documentElement, 'lock-for-modal' );
      removeClass( document.body,'lock-for-modal' );
    }
  },

  render: function() {
    let { loginModalActive } = this.state;
    let modal = ( loginModalActive ) ? <LoginModal key="app-login-modal-01" handleLoginModal={ this._toggleLoginModal } /> : <div></div>;
    let blurBg = ( loginModalActive ) ? "app-content-blur" : "";
    let zoomOut = ( loginModalActive ) ? "app-zoom-out lock-for-modal" : "";
    // keys required for React Addons TransitionGroup
    return (
      <React.addons.TransitionGroup component="div">
        { modal }
        <div key="app-perspective-container-01" id="app-perspective-container">
          <div key="app-scale-01" id="app-scale" className={ zoomOut }>
            <AppHeader key="app-header-01" modalActive={ loginModalActive } handleLoginModal={ this._toggleLoginModal }/>
            <Home key="app-home-01" modalActive={ loginModalActive }/>
            <AppFooter key="app-footer-01" modalActive={ loginModalActive }/>
            <div key="app-overlay-bg-02" id="app-bg-default" className={ blurBg } />
          </div>
        </div>
      </React.addons.TransitionGroup>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
