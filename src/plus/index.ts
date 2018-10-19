import { BrowserBuilder, NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';
import { Path, virtualFs, getSystemPath } from '@angular-devkit/core';
import * as fs from 'fs';
import * as path from 'path';
import { PlusBuilderSchema } from './schema';

const webpackMerge = require('webpack-merge');

export class PlusBuilder extends BrowserBuilder  {

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<fs.Stats>,
    options: PlusBuilderSchema,
  ) {

    let config = super.buildWebpackConfig(root, projectRoot, host, options);

    if (options.singleBundle) {
      delete config.entry.polyfills;
      delete config.optimization;
    }

    if (options.singleBundle && options.bundleStyles !== false) {
      delete config.entry.styles;
    }
    
    if (options.extraWebpackConfig) {
      const filePath = path.resolve(getSystemPath(projectRoot), options.extraWebpackConfig);
      const additionalConfig = require(filePath);
      config = webpackMerge([config, additionalConfig]);
    }

    return config;
  }
}

export default PlusBuilder;
