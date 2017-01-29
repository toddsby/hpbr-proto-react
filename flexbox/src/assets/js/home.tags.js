const HomeTags = React.createClass({
  
  render: function() {
    let { tags } = this.props;
    return (
      <div className="tags">
        { tags.map((item, idx) => {
            let classes = 'tag ' + item.type;
            let myKey = 'tag-' + idx; 
            return <span key={ myKey } className={ classes }>{ item.name }</span>
          }) 
        }
      </div>
    );
  }

});