// Uno.config.ts
import {defineConfig} from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
// Import presetTypography from '@unocss/preset-typography';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // PresetTypography(),
    // PresetTypography({
    //   // By default h2 and others have huge top margin, make them more reasonable
    //   cssExtend: {
    //     h1: {
    //       'margin-top': '1rem',
    //     },
    //     h2: {
    //       'margin-top': '1rem',
    //     },
    //     h3: {
    //       'margin-top': '1rem',
    //     },
    //     h4: {
    //       'margin-top': '1rem',
    //     },
    //     h5: {
    //       'margin-top': '1rem',
    //     },
    //   },
    // }),
    presetWebFonts({
      // Prefer bunny provider, but it seems to be broken with 2 theme overrides (only loads the first)
      provider: 'google',
      fonts: {
        // Mono: ['Inconsolata'],
        mono: ['Roboto Mono'],
        // Sans: [
        //   // {
        //   //   name: 'Jura',
        //   //   weights: ['400', '600'],
        //   // },
        //   // {
        //   //   name: 'Saira Condensed',
        //   //   weights: ['400', '600'],
        //   // },
        //   {
        //     name: 'Pixelify Sans',
        //     weights: ['400', '500'],
        //   },
        //   // I like Abel, but it is only 400 weight and the bold is ugly on safari.
        //   // {
        //   //   name: 'Abel',
        //   //   weights: ['400', '600'],
        //   // },
        // ],
        // Sans: ['Saira', 'Abel:400,600'],
        inter: {
          name: 'Inter',
          weights: ['400', '600', '700'],
          italic: true,
        },
        biter: {
          name: 'Bitter',
          weights: ['400', '600', '700'],
        },
        // Inter: [
        //   {
        //     name: 'Inter',
        //     weights: ['400', '600', '700'],
        //     italic: true,
        //   },
        //   {
        //     name: 'sans-serif',
        //     provider: 'none',
        //   },
        // ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'border-primary': 'rounded-md border-2 border-teal',
    'shadow-primary': 'shadow-xl shadow-teal-800',
    'border-focus': 'rounded-md border-2 border-violet-700',
    'shadow-focus': 'shadow-xl shadow-violet-700',
    'outline-focus': 'outline outline-2 outline-gray-200',
    btn: 'py-2 px-4 font-medium shadow-primary  border-primary bg-black',
    input:
      'p-2 shadow-primary border-primary bg-gray-900 text-white focus-visible:(border-focus outline-focus shadow-focus)',
    header:
      'text-2xl border-primary border-t-none rounded-t-none shadow-primary text-center py-2 font-medium',
    'nav-active': 'border-b-2 border-teal shadow-md shadow-teal-800',
    'nav-inactive': 'border-b-2 border-black shadow-none',
  },
  // https://github.com/unocss/unocss/discussions/2012
  // theme: {
  //   animation: {
  //     keyframes: {
  //       longtada: `{
  //         from {
  //           transform:scale3d(1,1,1)
  //         }
  //         1%,2% {
  //           transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)
  //         }
  //         3%,5%,7%,9% {
  //           transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)
  //         }
  //         4%,6%,8% {
  //           transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)
  //         }
  //         10% {
  //           transform:scale3d(1,1,1)
  //         }
  //       }`,
  //     },
  //     durations: {
  //       longtada: '12s',
  //     },
  //     timingFns: {},
  //     counts: {
  //       longtada: 'infinite',
  //     },
  //   },
  // },
  theme: {
    colors: {
      /* eslint-disable @typescript-eslint/naming-convention */
      nfMidnight: {
        100: '#000E38',
        80: '#0C3D60',
        50: '#526288',
        30: '#97A1B8',
        10: '#F4F8FA',
      },
      nfGreen: {
        100: '#00E5A4',
        80: '#33EAAE',
        50: '#78EEC5',
        30: '#B2F7E1',
        10: '#E5FCF5',
      },
      nfBlue: {
        100: '#166bff',
        80: '#4589FF',
        50: '#8AB5FF',
        30: '#B9D3FF',
        10: '#E8F0FF',
      },
      nfPurple: {
        100: '#8950FF',
        80: '#A173FF',
        50: '#C4A7FF',
        30: '#DCCAFF',
        10: '#F3EDFF',
      },
      nfGrey: {
        80: '#454551',
        30: '#D9D9D9',
        10: '#EAEBED',
      },
      /* eslint-enable @typescript-eslint/naming-convention */
    },
  },
  // Safelist: Array.from({length: 9}, (_, i) => `fill-red-${(i + 1) * 100}`),
  // Safelist: Array.from({length: 101}, (_, i) => `from-${i}%`),
});
