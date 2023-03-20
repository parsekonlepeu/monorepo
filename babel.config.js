module.exports = function getBabelConfig(api) {
  const useESModules = api.env(["esm", "legacy", "modern", "stable", "rollup"]);

  const presets = [
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        // browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        debug: process.env.BUILD_VERBOSE === "true",
        modules: useESModules ? false : "commonjs",
        // shippedProposals: api.env('modern'),
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ];
  const plugins = ["@emotion/babel-plugin", "babel-plugin-macros"];
  return {
    presets,
    plugins,
  };
};

// {
//    "presets": [
//         "@babel/preset-typescript",
//       [
//          "@babel/preset-env",
//          {
//          "targets": {
//          "edge": "17",
//          "firefox": "60",
//          "chrome": "67",
//          "safari": "11.1"
//             },
//          "useBuiltIns": "usage",
//          "corejs": "3.6.5"
//          }
//       ],
//       [
//          "@babel/preset-react",
//          { "runtime": "automatic", "importSource": "@emotion/react" }
//       ]
//    ],
//    "plugins": [
//       "@emotion/babel-plugin",
//       "babel-plugin-macros"
//    ]
// }
