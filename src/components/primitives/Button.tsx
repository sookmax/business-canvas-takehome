import React from "react";
import { Button as ButtonPrimitive } from "antd";

export function Button(
  props: React.ComponentPropsWithoutRef<typeof ButtonPrimitive>
) {
  return <ButtonPrimitive {...props} />;
}
