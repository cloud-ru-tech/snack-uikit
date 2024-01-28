import { Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';

type CurrentItem = {
  item: Dirent;
  parent: string;
};

function getAllSVGPaths(directory: string): string[] {
  const readDirectory = (path: string) =>
    readdirSync(path, {
      withFileTypes: true,
      encoding: 'utf-8',
    }).map(item => ({ item, parent: path }));

  let currentItem: CurrentItem | undefined;
  const paths: string[] = [];
  const queue = readDirectory(directory);

  while ((currentItem = queue.shift())) {
    if (currentItem.item.isFile() && currentItem.item.name.endsWith('.svg')) {
      paths.push(join(currentItem.parent, currentItem.item.name));
    }

    if (currentItem.item.isDirectory()) {
      const parentDirectory = join(currentItem.parent, currentItem.item.name);
      queue.push(...readDirectory(parentDirectory));
    }
  }

  return paths;
}

const OUTPUT_DIRS = [join(...['src', 'sprite', 'svg']), join(...['dist', 'sprite', 'svg'])];
const PREFIX = 'snack-uikit-';
const FILENAME = 'sprite.symbol.svg';

async function createSprite({
  source,
  destinations = OUTPUT_DIRS,
  fileName = FILENAME,
  prefix = PREFIX,
}: {
  source: string;
  destinations?: string[];
  fileName?: string;
  prefix?: string;
}) {
  const spriter = new SVGSpriter({
    dest: '',
    mode: { symbol: true },
    shape: {
      transform: [
        {
          custom: (shape, sprite, callback) => {
            const updatedSVG = optimize(shape.getSVG().replace(/fill="[A-Za-z0-9#]+"/g, 'fill="inherit"')).data;
            shape.setSVG(updatedSVG);
            callback(null);
          },
        },
      ],
    },
  });

  const allPaths = getAllSVGPaths(source);

  for (const path of allPaths) {
    spriter.add(prefix + basename(path), null, readFileSync(path, 'utf-8'));
  }

  const { result } = await spriter.compileAsync();

  for (const dir of destinations) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, fileName), result.symbol.sprite.contents);
  }
}

createSprite({ source: 'svgs-fixed' })
  // eslint-disable-next-line no-console
  .then(() => console.log(`sprite "${FILENAME}" is successfully created`))
  // eslint-disable-next-line no-console
  .catch(error => console.log(`error while creating sprite "${FILENAME}": ${error.message}`));
