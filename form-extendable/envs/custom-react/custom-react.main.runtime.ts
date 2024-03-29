import { MainRuntime } from '@teambit/cli';
import { ReactAspect, ReactMain, UseTypescriptModifiers } from '@teambit/react';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { CustomReactAspect } from './custom-react.aspect';
// import {
//  previewConfigTransformer,
//  devServerConfigTransformer
// } from './webpack/webpack-transformers';
// import {
//  devConfigTransformer,
//  buildConfigTransformer,
// } from "./typescript/ts-transformer";

export class CustomReactMain {
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect];

  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    // const webpackModifiers: UseWebpackModifiers = {
    //  previewConfig: [previewConfigTransformer],
    //  devServerConfig: [devServerConfigTransformer],
    // };

    // const tsModifiers: UseTypescriptModifiers = {
    //  devConfig: [devConfigTransformer],
    //  buildConfig: [buildConfigTransformer],
    // };

    const CustomReactEnv = react.compose([
      /**
       * Uncomment to override the config files for TypeScript, Webpack or Jest
       * Your config gets merged with the defaults
       */

      // react.useTypescript(tsModifiers),  // note: this cannot be used in conjunction with react.overrideCompiler
      // react.useWebpack(webpackModifiers),
      // react.overrideJestConfig(require.resolve('./jest/jest.config')),

      /**
       * override the ESLint default config here then check your files for lint errors
       * @example
       * bit lint
       * bit lint --fix
       */
      react.useEslint({
        transformers: [
          (config) => {
            /* Some rules are disabled due to conflict with vscode and prettier */
            config.setRule('no-console', ['off']);
            config.setRule('max-len', ['off']);
            config.setRule('operator-linebreak', ['off']);
            config.setRule('@typescript-eslint/comma-dangle', ['off']);
            config.setRule('nonblock-statement-body-position', ['off']);
            config.setRule('@typescript-eslint/indent', ['off']);
            config.setRule('react/jsx-props-no-spreading', ['off']);
            config.setRule('implicit-arrow-linebreak', ['off']);
            config.setRule('curly', ['off']);
            config.setRule('object-curly-newline', ['off']);
            config.setRule('no-confusing-arrow', ['off']);
            config.setRule('react/destructuring-assignment', ['off']);
            config.setRule('function-paren-newline', ['off']);

            return config;
          },
        ],
      }),

      /**
       * override the Prettier default config here the check your formatting
       * @example
       * bit format --check
       * bit format
       */
      // react.usePrettier({
      //  transformers: [
      //    (config) => {
      //      config.setKey('tabWidth', 2);
      //      return config;
      //    }
      //  ]
      // }),

      /**
       * override dependencies here
       * @example
       * Uncomment types to include version 17.0.3 of the types package
       */
      react.overrideDependencies({
        devDependencies: {
          // '@types/react': '17.0.3'
        },
      }),
    ]);
    envs.registerEnv(CustomReactEnv);
    return new CustomReactMain();
  }
}

CustomReactAspect.addRuntime(CustomReactMain);
