import path from "path";
import glob from "fast-glob";
import fse, { pathExists } from "fs-extra";
import { fileURLToPath } from "url";
import { promisify } from "util";
import ChildProcess from "child_process";

const monoRepoDirectoryPath = path.resolve(
  fileURLToPath(path.dirname(import.meta.url)),
  ".."
);
const packagePath = process.cwd();
const buildPath = path.join(packagePath, "./dist");
const srcPath = path.join(packagePath, "./src");

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

const changePkgJson = async (directoryPackage) => {
  const packageJsonPath = path.resolve(directoryPackage, "package.json");
  const pkgJSon = await fse.readFile(packageJsonPath);
  const { scripts, devDependencies, ...packageDataOther } = JSON.parse(pkgJSon);
  const newPkgJson = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main
      ? {
          main: "./cjs/index.js",
          module: "./esm/index.js",
          types: "./types/index.d.ts",
        }
      : {}),
  };
  return newPkgJson;
};

async function run() {
  try {
    const existReadMe = pathExists(path.resolve(packagePath, "./README.md"));
    await Promise.all(
      [
        existReadMe
          ? path.resolve(monoRepoDirectoryPath, "README.md")
          : "./README.md",
        // path.resolve(monoRepoDirectoryPath, "CHANGELOG.md"),
        path.resolve(monoRepoDirectoryPath, "LICENSE"),
      ].map((file) => includeFileInBuild(file))
    );

    const newPkgJson = await changePkgJson(packagePath);

    const targetPath = path.resolve(buildPath, "./package.json");

    await fse.writeFile(
      targetPath,
      JSON.stringify(newPkgJson, null, 2),
      "utf8"
    );
    console.log(`Created package.json in ${targetPath}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
