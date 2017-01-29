const guard = function(key, fn){
  return function(){
    if (guard.flags[key]) {
      return fn.apply(this, arguments);    
    } 
  };
};
guard.flags = {};
guard.enable = function(key){ guard.flags[key] = true };
guard.disable = function(key){ guard.flags[key] = false };

/*
  // http://stackoverflow.com/questions/26187189/in-react-js-is-there-any-way-to-disable-all-children-events
  // example usage

  _handleClick: guard( 'itemClick', function( item, idx ) {
    console.log('i was clicked...', item); 
  });

  return (
    <div onClick={this._handleClick}>click me!</div>
  );

  guard.disable('itemClick');
  this._handleClick(); // nothing happens on click
  
  guard.enable('itemClick');
  this._handleClick(); // click logs to console

 */