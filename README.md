# tailwindcss-simple-grid

```js
const grid = require('tailwindcss-simple-grid')

module.exports = {
  theme: {
    width: theme => ({
      auto: 'auto',
      full: '100%',
      ...grid(theme)
    }),
    margin: theme => ({
      ...grid(theme),
      ...grid.negative(theme)
    }),
    grid: {
      columns: 12,
      gutter: 32,
      container: {
        maxWidth: 1280,
        gutter: {
          _: 25,
          md: 50
        }
      }
    }
  },
  plugins: [grid],
  corePlugins: {
    container: false
  }
}
```

### Output

```css
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
  padding-left: 25px;
  padding-right: 25px
}

@media (min-width: 768px) {
  .container {
    padding-left: 50px;
    padding-right: 50px
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -16px;
  margin-right: -16px
}

.col {
  flex: none;
  padding-left: 16px;
  padding-right: 16px
}
```
