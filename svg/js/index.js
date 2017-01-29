function addEvent(el, evt, cb) { return ((el.attachEvent) ? el.attachEvent('on' + evt, cb) : el.addEventListener(evt, cb, false)); }

var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  allMenus = selectAll('.menuItem'),
  allMenuHits = selectAll('.menuHit'),
  selDot = '.selectionDot',
  allIcons = selectAll('#dimIconGroup .icons'),
  menuSeg0 = select('#menuSeg0'),
  segFill0 = select('#seg0'),
  allMenuPosArray = [],
  seenIcon = [],
  oldId = undefined,
  currentId = undefined,
  seg0expanded = false;

TweenMax.globalTimeScale(1.2);
TweenMax.set('svg', {
  visibility: 'visible'
});
TweenMax.set(allIcons, {
  transformOrigin: '50% 50%'
});
TweenMax.fromTo(menuSeg0, 1, {
  attr: { width:0 },
  ease: Power2.easeIn
},{
  attr: { width:80 }
});

var setupMenuPos = function( i, attr ) {
  return +( select('#menuDot' + i).getAttribute( attr ) )  
};

// init on page load
// setup event handlers
init();
// emulate initial menu click on page load
onMenuClick({ currentTarget: allMenus[0] });

function init() {
  for (var i = 0; i < allIcons.length; i++) {
    var icon = allIcons[i];
    icon.setAttribute( 'iconId', i );
  };

  for (var i = 0; i < allMenus.length; i++) {
    var menu = allMenus[i];
    menu.setAttribute( 'menuId', i );
    addEvent( menu, 'click', onMenuClick );
    allMenuPosArray.push({
      x: setupMenuPos( i, 'cx' ),
      y: setupMenuPos( i, 'cy')
    })
  }
  console.log(allMenuPosArray);
};

function onMenuClick(e) {
  console.log(e);

  oldId = currentId;

  if ( oldId == +e.currentTarget.getAttribute('menuId') ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  currentId = +e.currentTarget.getAttribute('menuId');

  TweenMax.from(e.currentTarget, 1, {
    transformOrigin: '50% 50%'
  })
  TweenMax.fromTo(allMenuHits[currentId], 1, {
      alpha: 0.3,
      scale: 1
    }, {
      alpha: 0,
      scale: 0.85,
      transformOrigin: '50% 50%'
    })

  if ( oldId !== undefined && seg0expanded === false ) {
    TweenMax.to(segFill0, 0.5, {
      attr: { width:52 },
      ease: Power2.easeIn
    });
    seg0expanded = !seg0expanded;
  }

  if ( oldId !== undefined ) {
      var exists = seenIcon.indexOf(oldId) > -1;
    if ( exists !== true ) {
      seenIcon.push(oldId);
    }
    console.log(seenIcon);
    TweenMax.to(allIcons[oldId], 0.5, {
      fill: '#fff'
    });
    TweenMax.fromTo(allMenuHits[oldId], 1, {
        alpha: 0,
        scale: 0
      }, {
        alpha: 1,
        fill: 'rgb(81,230,63)',
        scale: 0.85,
        transformOrigin: '50% 50%'
      });
  }
  //animates the masked, coloured selection dots
  var tl = new TimelineMax();
  tl.to(selDot, 0.5, {
      scale: 0.6,
      transformOrigin: '50% 50%',
      ease: Power2.easeIn
    })
    .to(selDot, 0.5, {
      x: allMenuPosArray[currentId].x,
      //ease:Elastic.easeOut.config(0.6, 0.8)
      ease: Circ.easeInOut
    }, '-=0.25')
    .to(selDot, 0.9, {
      scale: 0.95,
      transformOrigin: '50% 50%',
      ease: Elastic.easeOut.config(0.6, 0.8)
    }, '-=0.25')
  .staggerTo(allMenus, 0, {
    cycle: {

      cursor: function(i) {

        return (i == currentId) ? 'auto' : 'pointer'
      }
    }
  }, 0, 0)
  .staggerTo(allIcons, 0.6, {
    cycle: {
      fill: function(i) {
        var color = '#9387A9';
        console.log('stagger cycle:', +allIcons[i].getAttribute('iconId') );
        if ( i == currentId || seenIcon.indexOf( +allIcons[i].getAttribute('iconId') ) > -1 ){
          color = '#fff';
        }
        return color;
      },
      scale: function(i) {

        return (i == currentId) ? 1 : 0.8
      },
      duration: function(i) {

        return (i == currentId) ? 1.4 : 0.2
      },
      ease: function(i) {

        return (i == currentId) ? Power4.easeInOut : Linear.easeNone
      }
    }
  }, 0, 0)
};
