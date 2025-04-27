import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown, MenuProps } from "./Dropdown";
import { Button } from "./Button";
import { MoreOutlined } from "@ant-design/icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Dropdown",
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const onClick: MenuProps["onClick"] = ({ key }) => {
  console.log(key);
};

const items: MenuProps["items"] = [
  {
    key: "edit",
    label: "수정",
  },
  {
    type: "divider",
  },
  {
    key: "delete",
    label: "삭제",
    danger: true,
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <Dropdown
      menu={{ items, onClick }}
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ width: 180 }}
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  ),
};
