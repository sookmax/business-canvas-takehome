import React, { useEffect, useId, useState } from "react";
import { Form, FormItem, useForm, useFormWatch } from "./primitives/Form";
import {
  EMAIL_SUB_OPT_IN,
  EMAIL_SUB_OPT_OUT,
  FormFields,
  INITIAL_FORM_FIELDS,
  OCCUPATIONS,
  RecordType,
} from "../const";
import { Button } from "./primitives/Button";
import { Modal } from "./primitives/Modal";
import { TextArea, TextInput } from "./primitives/Input";
import { DatePicker } from "./primitives/DatePicker";
import { Select } from "./primitives/Select";
import { Checkbox } from "./primitives/Checkbox";
import { AppDispatch, AppState, useAppDispatch, useAppState } from "../store";

export function RecordFormModal() {
  const { isModalOpen, initialFormValues } = useAppState();
  const dispatch = useAppDispatch();

  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setResetKey((prev) => prev + 1);
  }, [isModalOpen]);

  return (
    <RecordFormModalInner
      key={resetKey}
      isModalOpen={isModalOpen}
      initialFormValues={initialFormValues}
      dispatch={dispatch}
    />
  );
}

const RecordFormModalInner = React.memo(function RecordFormModalInner({
  isModalOpen,
  initialFormValues,
  dispatch,
}: {
  isModalOpen: AppState["isModalOpen"];
  initialFormValues: AppState["initialFormValues"];
  dispatch: AppDispatch;
}) {
  const mode = initialFormValues === INITIAL_FORM_FIELDS ? "add" : "edit";
  const key = initialFormValues.key;
  const modalTitle = mode === "add" ? "회원 추가" : "회원 수정";

  const formId = useId();
  const [form] = useForm();
  const name = useFormWatch("name", form);
  const signUpDate = useFormWatch("sign-up-date", form);

  const canSubmit = !!name && !!signUpDate;

  const onCancel = () => {
    dispatch((state) => {
      state.isModalOpen = false;
    });
  };

  const onFinish = (values: unknown) => {
    const newRecord: Omit<RecordType, "key"> = {
      name: (values as FormFields).name,
      address: (values as FormFields).address ?? "",
      memo: (values as FormFields).memo ?? "",
      "sign-up-date": (values as FormFields)["sign-up-date"].format(
        "YYYY-MM-DD"
      ),
      occupation:
        OCCUPATIONS.find(
          (occupation) => occupation.value === (values as FormFields).occupation
        )?.label ?? "",
      "email-subscription": (values as FormFields)["email-subscription"]
        ? EMAIL_SUB_OPT_IN
        : EMAIL_SUB_OPT_OUT,
    };

    if (mode === "add") {
      dispatch((state) => {
        const lastRecordKey = state.records[state.records.length - 1].key;
        state.records.push({
          key: lastRecordKey + 1,
          ...newRecord,
        });
      });
    } else if (mode === "edit" && key !== null) {
      dispatch((state) => {
        state.records = state.records.map((record) => {
          if (record.key !== key) return record;
          return {
            key,
            ...newRecord,
          };
        });
      });
    }
    dispatch((state) => {
      state.isModalOpen = false;
    });
  };

  return (
    <>
      <Modal
        title={modalTitle}
        centered
        open={isModalOpen}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            취소
          </Button>,
          <Button
            key="submit"
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
          initialValues={initialFormValues}
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
            <Select options={OCCUPATIONS} style={{ width: 100 }} />
          </FormItem>
          <FormItem
            valuePropName="checked"
            label="이메일 수신 동의"
            name="email-subscription"
          >
            <Checkbox />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});
