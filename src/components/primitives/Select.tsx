import { Select as SelectPrimitive } from "antd";
import React from "react";

export function Select(
  props: React.ComponentPropsWithoutRef<typeof SelectPrimitive>
) {
  return <SelectPrimitive {...props} />;
}
