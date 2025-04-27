import React from "react";
import { Input as InputPrimitive } from "antd";

export function TextInput(
  props: React.ComponentPropsWithoutRef<typeof InputPrimitive>
) {
  return <InputPrimitive {...props} />;
}

export function TextArea(
  props: React.ComponentPropsWithoutRef<typeof InputPrimitive.TextArea>
) {
  return <InputPrimitive.TextArea {...props} />;
}
