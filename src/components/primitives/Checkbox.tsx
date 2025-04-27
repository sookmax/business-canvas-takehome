import { Checkbox as CheckboxPrimitive } from "antd";

export function Checkbox(
  props: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive>
) {
  return <CheckboxPrimitive {...props} />;
}
