import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Form, FormItem, useForm, useFormWatch } from "./Form";
import { TextArea, TextInput } from "./Input";
import { DatePicker } from "./DatePicker";
import { Select } from "./Select";
import { OCCUPATIONS } from "../../const";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { Flex } from "./Layout";
import { useEffect, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Form",
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

function FormExampleComponent(args: Story["args"]) {
  const [form] = useForm();
  const name = useFormWatch("name", form);
  const signUpDate = useFormWatch("sign-up-date", form);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // New in 5.5.0. Only validate content and not show error message on UI.
    form
      .validateFields({ validateOnly: true })
      .then(() => setCanSubmit(true))
      .catch(() => setCanSubmit(false));
  }, [form, name, signUpDate]);

  return (
    <Form
      {...args}
      form={form}
      layout="vertical"
      scrollToFirstError={{ behavior: "instant", block: "center", focus: true }}
    >
      <FormItem
        label="이름"
        name="name"
        rules={[{ required: true, message: "이름은 필수 입력값 입니다." }]}
      >
        <TextInput placeholder="이름을 입력 해주세요" />
      </FormItem>
      <FormItem
        label="주소"
        name="address"
        validateDebounce={300}
        rules={[
          {
            type: "string",
            max: 20,
            message: "주소는 20자 까지만 입력 가능합니다.",
          },
        ]}
      >
        <TextInput placeholder="주소를 입력 해주세요 (20자 제한)" />
      </FormItem>
      <FormItem
        label="메모"
        name="memo"
        rules={[
          {
            type: "string",
            max: 50,
            message: "메모는 50자 까지만 입력 가능합니다.",
          },
        ]}
      >
        <TextArea
          rows={3}
          placeholder="메모를 입력 해주세요 (50자 제한)"
          showCount
          maxLength={50}
        />
      </FormItem>
      <FormItem label="가입일" name="sign-up-date" rules={[{ required: true }]}>
        <DatePicker
          placeholder="가입일을 선택 해주세요"
          style={{ width: 180 }}
        />
      </FormItem>
      <FormItem label="직업" name="occupation">
        <Select
          defaultValue={OCCUPATIONS[0].value}
          options={OCCUPATIONS}
          style={{ width: 85 }}
        />
      </FormItem>
      <FormItem label="이메일 수신 동의" name="email-subscription">
        <Checkbox />
      </FormItem>
      <FormItem>
        <Flex justify="center" gap={8}>
          <Button type="primary" htmlType="submit" disabled={!canSubmit}>
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Flex>
      </FormItem>
    </Form>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render: (args) => {
    return <FormExampleComponent {...args} />;
  },
};
