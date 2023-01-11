/* {
  "source": [
    "tokens/** /*.json"
  ],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "prefix": "sd",
      "buildPath": "tokens/scss/",
      "files": [
        {
          "destination": "_variables.scss",
          "format": "scss/variables"
        }
      ]
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "tokens/css/",
      "files": [
        {
          "destination": "variables.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
*/

// config.js
module.exports = {
  source: [`tokens/**/*.json`],
  // transform: {
  // Now we can use the transform 'myTransform' below
  // myTransform: {
  //   type: 'name',
  //   transformer: (token) => token.path.join('_').toUpperCase()
  // }
  // },
  // Same with formats, you can now write them directly to this config
  // object. The name of the format is the key.
  //   format: {
  //     myFormat: ({ dictionary, platform }) => {
  //       // console.log(dictionary);
  //       // console.log(platform);
  //
  //       const formatEntry = (key, value) => `--${key}: ${String(value).toLowerCase()};`;
  //
  //       // const tokens = dictionary.allTokens
  //       //   .map(token => {
  //       //     if (token.type !== 'composition') {
  //       //       return formatEntry(token.name, token.value);
  //       //     }
  //       //
  //       //     return Object.entries(token.value)
  //       //       .map(([key, value]) => formatEntry(`${token.name}-${key}`, value))
  //       //       .join('\n      ');
  //       //   })
  //       //   .join('\n      ');
  //
  //       const tokens = dictionary.allTokens.map(token => formatEntry(token.name, token.value)).join('\n      ');
  //
  //       return `import { css } from '@linaria/core';
  //
  // export const TOKENS = css\`
  //   :global() {
  //     body {
  //       ${tokens}
  //     }
  //   }
  // \`;
  // `;
  //     },
  //   },
  //   platforms: {
  //     css: {
  //       transformGroup: 'css',
  //       buildPath: 'tokens/build/',
  //       files: [
  //         {
  //           destination: 'variables.css',
  //           format: 'css/variables',
  //         },
  //       ],
  //     },
  //     // linaria: {
  //     //   transformGroup: 'css',
  //     //   buildPath: 'tokens/build/',
  //     //   files: [
  //     //     {
  //     //       destination: 'styled.ts',
  //     //       format: 'myFormat',
  //     //     },
  //     //   ],
  //     // },
  //   },

  // source: [
  //   '../figma-tokens/New_Tokens/Base/*.json',
  //   '../figma-tokens/New_Tokens/Themes/Color/Mode/Light_Mode.json',
  //   '../figma-tokens/New_Tokens/Themes/Color/Ml_Space.json',
  //   '../figma-tokens/New_Tokens/Themes/Settings/Ml_Space.json',
  //   '../figma-tokens/New_Tokens/Themes/Typography/Ml_Space.json',
  //   '../figma-tokens/New_Tokens/Components/Avatar/Avatar.json',
  // ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/build/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
