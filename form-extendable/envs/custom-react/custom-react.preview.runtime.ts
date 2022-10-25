import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
// uncomment the line below and install the theme if you want to use our theme or create your own and import it here
// import { ThemeCompositions } from '@teambit/documenter.theme.theme-compositions';

import { CustomReactAspect } from './custom-react.aspect';

export class CustomReactPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const customReactPreviewMain = new CustomReactPreviewMain();
    // uncomment the line below to register a new provider to wrap all compositions using this environment with a custom theme.
    // react.registerProvider([ThemeCompositions]);

    return customReactPreviewMain;
  }
}

CustomReactAspect.addRuntime(CustomReactPreviewMain);
