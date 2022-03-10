const fs = require('fs');
const path = require('path');

const nodeModulesDir = path.join(__dirname, '../node_modules');

fs.rmSync(nodeModulesDir, { recursive: true, force: true });
