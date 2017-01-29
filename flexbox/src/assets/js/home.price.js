const HomePrice = React.createClass({

  // ensure price is a float with 2 decimal places
  _normalizePrice: function ( price ) {
    return parseFloat(Math.round(price * 100) / 100).toFixed(2);
  },
  
  render: function() {
    let { price, sale } = this.props;
    let nPrice = this._normalizePrice( price );
    let nSalePrice = undefined;
    if ( sale && sale.price ) {
      nSalePrice = this._normalizePrice( sale.price );
    }
    let qty = null, 
    itemPrice = null;

    if ( sale ) { 
      itemPrice = <div className="price"><s>$ { nPrice }</s> <span className="sale">$ { nSalePrice }</span></div>;
    } else {
      itemPrice = <div className="price">$ { nPrice }</div>
    }
    if ( sale && sale.qty ) { 
      qty = <div className="limited-qty">{ sale.qty } left!</div>;
    } else { 
      qty = <div></div>;
    }
    return (
      <div className="money-info">
        <div className="pricetag">Starts at</div>
        { itemPrice }
        { qty }
      </div>
    );
  }

});