import { MainRuntime } from '@teambit/cli';
import {
  GeneratorMain,
  GeneratorAspect,
  ComponentContext,
} from '@teambit/generator';
import { TypescriptAspect } from './typescript.aspect';

export class TypescriptMain {
  static slots = [];

  static dependencies = [GeneratorAspect];

  static runtime = MainRuntime;

  static async provider([generator]: [GeneratorMain]) {
    /**
     * Array of templates. Add as many templates as you want
     * Separate the templates to multiple files if you prefer
     * Modify, add or remove files as needed
     * See the docs file of this component for more info
     */

    generator.registerComponentTemplate([
      {
        name: 'typescript-lib',
        description: 'Typescript lib scaffolder',
        generateFiles: (context: ComponentContext) => [
          // index file
          {
            relativePath: 'index.ts',
            isMain: true,
            content: `export {} from '';
`,
          },
        ],
      },
    ]);

    return new TypescriptMain();
  }
}

TypescriptAspect.addRuntime(TypescriptMain);
