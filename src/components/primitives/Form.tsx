import { Form as FormPrimitive } from "antd";
import React from "react";

function customRequiredMark(
  labelNode: React.ReactNode,
  info: {
    required: boolean;
  }
) {
  return (
    <>
      {labelNode}
      {info.required && (
        <span
          style={{
            color: "var(--ant-form-label-required-mark-color)",
            fontWeight: "normal",
            marginLeft: "4px",
          }}
        >
          *
        </span>
      )}
    </>
  );
}

export function Form(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof FormPrimitive>,
    "requiredMark"
  >
) {
  return <FormPrimitive {...props} requiredMark={customRequiredMark} />;
}

export function FormItem(
  props: React.ComponentPropsWithoutRef<typeof FormPrimitive.Item>
) {
  return <FormPrimitive.Item {...props} />;
}

export const useForm = FormPrimitive.useForm;
export const useFormWatch = FormPrimitive.useWatch;

export type { FormProps } from "antd";
