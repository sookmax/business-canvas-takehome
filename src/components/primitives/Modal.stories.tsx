import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";
import { useId, useState } from "react";
import { Button } from "./Button";
import { Form, FormItem, useForm, useFormWatch } from "./Form";
import { TextArea, TextInput } from "./Input";
import { DatePicker } from "./DatePicker";
import { Select } from "./Select";
import { OCCUPATIONS } from "../../const";
import { Checkbox } from "./Checkbox";
import { Dayjs } from "dayjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

type FormFields = {
  name: string;
  address?: string;
  memo?: string;
  "sign-up-date": Dayjs;
  occupation?: string;
  "email-subscription"?: boolean;
};

function DefaultComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const formId = useId();
  const [form] = useForm();
  const name = useFormWatch("name", form);
  const signUpDate = useFormWatch("sign-up-date", form);

  const canSubmit = !!name && !!signUpDate;

  const onFinish = (values: unknown) => {
    console.log(
      "onFinish",
      (values as FormFields)["sign-up-date"].format("YYYY-MM-DD")
    );
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal
        title="회원 추가"
        centered
        open={isOpen}
        footer={[
          <Button onClick={() => setIsOpen(false)}>취소</Button>,
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit}
            form={formId}
          >
            저장
          </Button>,
        ]}
      >
        <Form
          id={formId}
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
            <TextInput
              placeholder="주소를 입력 해주세요 (20자 제한)"
              showCount
              maxLength={20}
            />
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
            rules={[
              { required: true, message: "가입일은 필수 입력값 입니다." },
            ]}
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
      </Modal>
    </>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render: () => <DefaultComponent />,
};
