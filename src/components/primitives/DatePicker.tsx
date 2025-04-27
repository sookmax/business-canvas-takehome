import { DatePicker as DatePickerPrimitive } from "antd";

export function DatePicker(
  props: React.ComponentPropsWithoutRef<typeof DatePickerPrimitive>
) {
  return <DatePickerPrimitive {...props} />;
}
