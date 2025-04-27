import React from "react";
import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
import { GLOBAL_THEME } from "../src/const";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f0f0f0" },
      ],
      default: "white",
    },
  },
  decorators: [
    (Story) => {
      return (
        <ConfigProvider theme={GLOBAL_THEME}>
          <Story />
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
