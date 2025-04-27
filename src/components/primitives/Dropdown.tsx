import { Dropdown as DropdownPrimitive } from "antd";
import React from "react";

export type { MenuProps } from "antd";

export function Dropdown(
  props: React.ComponentPropsWithoutRef<typeof DropdownPrimitive>
) {
  return <DropdownPrimitive {...props} />;
}
