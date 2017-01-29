
const HomeList = React.createClass({ 

  propTypes: {
    items: React.PropTypes.array.isRequired,
    onListItemClick: React.PropTypes.func.isRequired
  },

  render: function () {
    let { items, onListItemClick } = this.props;

    return (
      <section className="main-dolls">
        <React.addons.TransitionGroup component="ul" className="main-dolls-list Grid Grid--full med-Grid--1of3 small-Grid--1of2 large-Grid--fit">
          { items.map((item, index) => {
              return <HomeListItem key={index} idx={index} item={item} clicked={onListItemClick} />
            }) 
          }
        </React.addons.TransitionGroup>
      </section>
    );
  }

});