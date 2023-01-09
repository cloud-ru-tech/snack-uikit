import { DepGraph } from 'dependency-graph';

export function sortFolders(folders: string[]) {
  const graph = new DepGraph();

  const foldersByPackageName = {};

  folders.forEach(folder => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageConfig = require(`${folder}/package.json`);

    const packageName = packageConfig.name;

    foldersByPackageName[packageName] = folder;

    if (!graph.hasNode(packageName)) {
      graph.addNode(packageName);
    }

    if (packageConfig.dependencies) {
      Object.keys(packageConfig.dependencies).forEach(dependency => {
        if (/@sbercloud\/(uikit-).*/.test(dependency)) {
          if (!graph.hasNode(dependency)) {
            graph.addNode(dependency);
          }

          graph.addDependency(packageName, dependency);
        }
      });
    }
  });

  return graph
    .overallOrder()
    .map(packageName => foldersByPackageName[packageName])
    .filter(Boolean);
}
