
const HomeListItem = React.createClass({

  propTypes: {
    idx: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
    clicked: React.PropTypes.func.isRequired
  },

  _handleTouchStart: function ( e ) {
   // enables active state animation on buttons for iOS
  },

  _handleClick: function ( e ) {
    this.props.clicked( this.props.item, this.props.idx );
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

  render: function () {

    let { item } = this.props;
    let source = `/${item.imageUrl}`;
    let tags = null;
    // @TODO refactor into HomeTags
    ( item.tags ) ? tags = <HomeTags tags={item.tags} /> : tags = <div className="tags notags"><span className="tag top">Top-Seller</span></div>
    // let progress = { height: `${item.wizard.progress}%` };
    return (
      <li className="Grid-cell">
        <div className="item pad-bottom-25 homepage-doll-item" onClick={this._handleClick}>
          <div className="doll-item-image">
            <DollCircle imgSrc={source} />
          </div>
          <div className="doll-item-info">
            { tags }
            <div className="item-name">{item.name}</div>
            <HomePrice price={item.price} sale={item.sale} />
            <button onTouchStart={this._handleTouchStart} className="btn btn-doll-customize-shape" role="button">Customize</button>
          </div>
        </div>
      </li>
    );

  }

});