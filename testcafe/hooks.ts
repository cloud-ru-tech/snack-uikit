import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Server } from 'http';
import { join } from 'path';

import express from 'express';
import { CoverageMap, createCoverageMap } from 'istanbul-lib-coverage';
import { ClientFunction } from 'testcafe';
const tempDir = join(process.cwd(), '.nyc_output');
const nycFilename = join(tempDir, 'out.json');

type Coverage = Window['__coverage__'];
const coverages: Array<Coverage> = [];

function saveCoverage(coverage: CoverageMap) {
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }
  writeFileSync(nycFilename, JSON.stringify(coverage));
}

function fixSourcePaths(coverage: any) {
  Object.values(coverage).forEach((file: any) => {
    const { path: absolutePath, inputSourceMap } = file;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fileName = /([^\/\\]+)$/.exec(absolutePath)[1];
    if (!inputSourceMap || !fileName) return;

    if (inputSourceMap.sourceRoot) inputSourceMap.sourceRoot = '';
    inputSourceMap.sources = inputSourceMap.sources.map((source: string | string[]) =>
      source.includes(fileName) ? absolutePath : source,
    );
  });
}

function combineCoverage(sentCoverage: Coverage) {
  fixSourcePaths(sentCoverage);
  coverages.push(sentCoverage);
}

const getCoverageObject = ClientFunction(() =>
  fetch('http://localhost:1488/__coverage__', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(window.__coverage__),
  }),
);
let server: Server;
export const hooks = {
  testRun: {
    before: () => {
      const app = express();
      app.use(express.json({ limit: '150mb' }));
      app.use(express.text({ limit: '150mb' }));
      app.post('/__coverage__', function (req, res) {
        let parsed;
        try {
          parsed = JSON.parse(req.body);
        } catch (e) {
          // hangs here after error
          parsed = {};
        }
        combineCoverage(parsed);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).end();
      });

      server = app.listen(1488);
    },
    after: () => {
      const maps = coverages.map(x => createCoverageMap(x));
      const totalCoverage = maps.reduce((acc: CoverageMap, val: CoverageMap) => {
        val.merge(acc);
        return val;
      }, createCoverageMap({}));

      saveCoverage(totalCoverage);
      server.close();
    },
  },
  test: {
    after: async () => getCoverageObject(),
  },
};
