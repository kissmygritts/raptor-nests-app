const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        carolina: '#589fd6',
        ginger: '#e0dd89',
        almond: '#ffead1',
        oxford: {
          lightest: '#2e598a',
          lighter: '#24456b',
          default: '#19304b',
          darker: '#14273d',
          darkest: '#0f1e2e'
        },
        olive: {
          lightest: '#acc3af',
          lighter: '#95b298',
          default: '#7a9e7f',
          darker: '#678e6c',
          darkest: '56765a'
        },
        saffron: {
          lightest: '#f8c9a0',
          lighter: '#f6b379',
          default: '#f29647',
          darker: '#f0882d',
          darkest: '#e57310'
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ]
}
