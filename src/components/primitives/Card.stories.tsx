import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Button } from "./Button";
import { CloseOutlined } from "@ant-design/icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Card",
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "회원 추가",
    extra: (
      <Button
        type="text"
        icon={<CloseOutlined style={{ fontSize: 18, color: "#00000073" }} />}
      />
    ),
  },
};
