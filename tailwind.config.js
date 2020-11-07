module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        carolina: '#589fd6',
        ginger: '#e0dd89',
        almond: '#ffead1',
        oxford: {
          lightest: '#2e598a',
          lighter: '#24456b',
          default: '#19304b',
          darker: '#14273d',
          darkest: '#0f1e2e',
          50: '#f3f5f6',
          100: '#dbe0e3',
          200: '#c4ccd1',
          300: '#acb6be',
          400: '#94a1ac',
          500: '#7d8c99',
          600: '#657787',
          700: '#4d6174',
          800: '#364b62',
          900: '#19304b', // brand/base color
          base: '#19304b' // brand/base color
        },
        olive: {
          lightest: '#acc3af',
          lighter: '#95b298',
          default: '#7a9e7f',
          darker: '#678e6c',
          darkest: '56765a',
          50: '#f5f8f6',
          100: '#e2eae5',
          200: '#cfdcd2',
          300: '#bccec0',
          400: '#a9c1ae',
          500: '#96b39a',
          600: '#7a9e7f', // brand/base color
          700: '#66846a',
          800: '#3f5242',
          900: '#18201a',
          base: '#7a9e7f' // brand/base color
        },
        saffron: {
          lightest: '#f8c9a0',
          lighter: '#f6b379',
          default: '#f29647',
          darker: '#f0882d',
          darkest: '#e57310',
          50: '#fef6ef',
          100: '#fce4d0',
          200: '#f9d3b1',
          300: '#f7c292',
          400: '#f5af72',
          500: '#f29647', // brand/base color
          600: '#d0803d',
          700: '#985c2c',
          800: '#60391b',
          900: '#28170a',
          base: '#f29647' // brand/base color
        }
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')]
}
