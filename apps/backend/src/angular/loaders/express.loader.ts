import { Injectable, Logger } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { loadPackage } from '../angular.utils';
import { AngularModuleOptions } from '../interfaces/angular-options.interface';
import { AbstractLoader } from './abstract.loader';
import historyApiFallback = require('connect-history-api-fallback');

@Injectable()
export class ExpressLoader extends AbstractLoader {
  public register(
    httpAdapter: AbstractHttpAdapter,
    options: AngularModuleOptions,
  ) {
    const app = httpAdapter.getInstance();
    const express = loadPackage('express', 'AngularModule', () =>
      require('express'),
    );
    const clientPath = options.rootPath;
    const indexFilePath = this.getIndexFilePath(clientPath);
    app.use(
      historyApiFallback({
        logger: (...logs) => Logger.log(logs.join(' ')),
        rewrites: [
          {
            from: /^\/api\/(.*)$/,
            to(context) {
              return `/${context.match[2]}/${context.match[3]}`;
            },
          },
        ],
      }),
    );
    app.use(express.static(clientPath, options.serveStaticOptions));
    app.get(options.renderPath, (req: any, res: any) => {
      console.log(req.path);
      res.sendFile(indexFilePath);
    });
  }
}
