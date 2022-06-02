const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,pug}'],
  theme: {
    extend: {
      fontSize: {
        'tiny': '.938rem',
        'menu-title': '5.5rem',
        '20vw': '20vw',
        'middle': '0.9375rem'
      },
      width: {
        '1of5': '20%',
        '1of4': '25%',
        '1of3': '33.333333%',
        '1of2': '50%',
        '7of12': '58.333333%',

      },
      height: {
        '1of3': '33.333333%',
        '1of2': '50%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}
