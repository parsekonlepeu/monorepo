import path from "path";
import glob from "fast-glob";
import fse from "fs-extra";
import { fileURLToPath } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { promisify } from "util";
import ChildProcess from "child_process";

const exec = promisify(ChildProcess.exec);

const validBundles = ["esm", "cjs"];

const run = async (argv) => {
  const { bundle, outDir: relativeOutDir, verbose } = argv;

  if (validBundles.indexOf(bundle) === -1) {
    throw new TypeError(
      `Unrecognized bundle '${bundle}'. Did you mean one of "${validBundles.join(
        '", "'
      )}"?`
    );
  }

  const pathScriptDirectory = fileURLToPath(path.dirname(import.meta.url));

  const env = {
    NODE_ENV: "production",
    BABEL_ENV: bundle,
    BUILD_VERBOSE: verbose,
  };
  const babelConfigPath = path.resolve(
    pathScriptDirectory,
    "../babel.config.js"
  );
  const srcDir = path.resolve("./src");
  const extensions = [".js", ".ts", ".tsx"];
  const ignore = [
    "**/*.test.js",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.d.ts",
  ];

  const outDir = path.resolve(relativeOutDir, bundle);

  const babelArgs = [
    "--config-file",
    babelConfigPath,
    "--extensions",
    `"${extensions.join(",")}"`,
    srcDir,
    "--out-dir",
    outDir,
    "--ignore",
    // Need to put these patterns in quotes otherwise they might be evaluated by the used terminal.
    `"${ignore.join('","')}"`,
  ];

  const command = ["babel ./src", ...babelArgs].join(" ");

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(`running '${command}' with ${JSON.stringify(env)}`);
  }

  const { stderr, stdout } = await exec(command, {
    env: { ...process.env, ...env },
  });
  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(stdout);
  }
};

yargs(hideBin(process.argv))
  .command({
    command: "$0 <bundle>",
    description: "build package",
    builder: (command) => {
      return command
        .positional("bundle", {
          description: `Valid bundles: "${validBundles.join('" | "')}"`,
          type: "string",
        })
        .option("largeFiles", {
          type: "boolean",
          default: false,
          describe:
            "Set to `true` if you know you are transpiling large files.",
        })
        .option("out-dir", { default: "./dist", type: "string" })
        .option("verbose", { type: "boolean" });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
