function simpleGrid(arg) {
  if (typeof arg === 'function') {
    let theme = arg
    return require('./columns.js')(theme('grid.columns'))
  }

  let { addComponents, theme } = arg

  let container = [
    { '.container': { width: '100%', marginLeft: 'auto', marginRight: 'auto' } }
  ]

  let { maxWidth, gutter: containerGutter } = theme('grid.container', {})
  if (maxWidth) {
    container[0]['.container'].maxWidth = `${maxWidth}px`
  }
  if (containerGutter) {
    if (!isObject(containerGutter)) {
      containerGutter = { _: containerGutter }
    }
    let screens = theme('screens', {})

    Object.keys(containerGutter).forEach(screen => {
      let styles = {
        paddingLeft: `${containerGutter[screen]}px`,
        paddingRight: `${containerGutter[screen]}px`
      }
      if (screen === '_') {
        container[0]['.container'] = {
          ...container[0]['.container'],
          ...styles
        }
      } else {
        container.push({
          [`@media (min-width: ${screens[screen]})`]: { '.container': styles }
        })
      }
    })
  }

  let gutter = theme('grid.gutter')

  let row = {
    display: 'flex',
    flexWrap: 'wrap',
    ...(gutter
      ? { marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` }
      : {})
  }

  let col = {
    width: '100%',
    flex: 'none',
    ...(gutter
      ? { paddingLeft: `${gutter / 2}px`, paddingRight: `${gutter / 2}px` }
      : {})
  }

  addComponents([
    ...container,
    {
      '.row': row,
      '.col': col
    }
  ])
}

function isObject(x) {
  return (typeof x === 'object' || typeof x === 'function') && x !== null
}

simpleGrid.negative = function gridNegative(theme) {
  let cols = require('./columns.js')(theme('grid.columns'))
  return Object.keys(cols).reduce((acc, cur) => {
    return { ...acc, [`-${cur}`]: `-${cols[cur]}` }
  }, {})
}

module.exports = simpleGrid
