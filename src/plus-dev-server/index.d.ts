/// <reference types="node" />
import { Path, virtualFs } from '@angular-devkit/core';
import * as fs from 'fs';
import { DevServerBuilder as DevServerBuilderBase, BrowserBuilderSchema as BrowserBuilderSchemaBase } from '@angular-devkit/build-angular';
export interface BrowserBuilderSchema extends BrowserBuilderSchemaBase {
    extraWebpackConfig: string;
    singleBundle: boolean;
    bundleStyles: boolean;
}
export declare class DevServerBuilder extends DevServerBuilderBase {
    buildWebpackConfig(root: Path, projectRoot: Path, host: virtualFs.Host<fs.Stats>, browserOptions: BrowserBuilderSchema): any;
}
export default DevServerBuilder;
