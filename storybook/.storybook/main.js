const path = require("path");
module.exports = {
  stories: [
    "../../packages/**/stories/**/*.stories.mdx",
    "../../packages/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  features: {
    storyStoreV7: true,
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      "@parsekonlepeu/utils": path.resolve(
        __dirname,
        "../../packages/utils/src/index"
      ),
      "@parsekonlepeu/diary": path.resolve(
        __dirname,
        "../../packages/diary/src/index"
      ),
      "@parsekonlepeu/picker": path.resolve(
        __dirname,
        "../../packages/picker/src/index"
      ),
    };
    return config;
  },
  babel: async (options) => {
    const newoptions = {
      ...options,
      presets: [
        "@babel/preset-typescript",
        [
          "@babel/env",
          {
            targets: {
              edge: "17",
              firefox: "60",
              chrome: "67",
              safari: "11.1",
            },
            useBuiltIns: "usage",
            corejs: "3.6.5",
          },
        ],
        [
          "@babel/preset-react",
          { runtime: "automatic", importSource: "@emotion/react" },
        ],
      ],
      plugins: ["@emotion/babel-plugin", "babel-plugin-macros"],
    };
    return newoptions;
  },
};
