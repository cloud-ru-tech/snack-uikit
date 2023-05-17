import * as ts from 'typescript';
import { ImportDeclaration } from 'typescript';

const SCSS_EXTENSION_REGEX = /\.scss['"]$/;

function scssImportVisitor(ctx: ts.TransformationContext, node: ImportDeclaration) {
  const importPath = node.moduleSpecifier.getText();
  const newPath = importPath.replace(SCSS_EXTENSION_REGEX, '.css').substring(1);
  const moduleSpecifier = ctx.factory.createStringLiteral(newPath, true);

  return ctx.factory.updateImportDeclaration(
    node,
    node.modifiers,
    node.importClause,
    moduleSpecifier,
    node.assertClause,
  );
}

export default function () {
  return (ctx: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
    function visitor(node: ts.Node): ts.Node {
      if (ts.isImportDeclaration(node)) {
        const importPath = node.moduleSpecifier.getText();

        if (SCSS_EXTENSION_REGEX.test(importPath)) {
          return scssImportVisitor(ctx, node);
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    }
    return ts.visitEachChild(sourceFile, visitor, ctx);
  };
}
