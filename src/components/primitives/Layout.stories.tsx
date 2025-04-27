import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Layout, Typography } from "./Layout";
import { Button } from "./Button";
import { CloseOutlined } from "@ant-design/icons";
import { Form, FormItem, useForm, useFormWatch } from "./Form";
import { useEffect, useId, useState } from "react";
import { TextArea, TextInput } from "./Input";
import { DatePicker } from "./DatePicker";
import { Select } from "./Select";
import { OCCUPATIONS } from "../../const";
import { Checkbox } from "./Checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Layout",
  component: Layout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "gray",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, backgroundColor: "#F5F5F5" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

function LayoutExampleComponent() {
  const formId = useId();
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
    <Layout>
      <Layout.Header
        style={{
          borderBottom: "1px solid var(--custom-layout-border-color)",
        }}
      >
        <Flex justify="space-between" align="center">
          <Typography.Title
            level={2}
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "22px",
            }}
          >
            회원 추가
          </Typography.Title>
          <Button
            type="text"
            icon={
              <CloseOutlined style={{ fontSize: 16, color: "#00000073" }} />
            }
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </Flex>
      </Layout.Header>
      <Layout.Content
        style={{
          padding: "var(--ant-layout-header-padding)",
          borderBottom: "1px solid var(--custom-layout-border-color)",
        }}
      >
        <Form
          id={formId}
          form={form}
          layout="vertical"
          scrollToFirstError={{
            behavior: "instant",
            block: "center",
            focus: true,
          }}
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
          <FormItem
            label="가입일"
            name="sign-up-date"
            rules={[{ required: true }]}
          >
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
        </Form>
      </Layout.Content>
      <Layout.Footer>
        <Flex justify="end" gap={8}>
          <Button htmlType="reset" form={formId}>
            취소
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit}
            form={formId}
          >
            저장
          </Button>
        </Flex>
      </Layout.Footer>
    </Layout>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: LayoutExampleComponent,
};
