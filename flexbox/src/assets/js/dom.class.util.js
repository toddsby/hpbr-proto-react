// vanilla js dom hasClass, addClass, removeClass
// http://jaketrent.com/post/addremove-classes-raw-javascript/

const hasClass = function ( el, className ) {
  if ( el.classList ) {
    return el.classList.contains( className );
  } else {
    return !!el.className.match( new RegExp('(\\s|^)' + className + '(\\s|$)') );
  }
}

const addClass = function ( el, className ) {
  if ( el.classList ) {
    el.classList.add( className );
  } else if ( !hasClass( el, className ) ) {
    el.className += " " + className;
  }
};

const removeClass = function ( el, className ) {
  if ( el.classList ) {
    el.classList.remove( className )
  }
  else if ( hasClass( el, className ) ) {
    let reg = new RegExp( '(\\s+|^)' + className + '(\\s+|$)' );
    el.className = el.className.replace( reg, ' ' );
  }
}