import { Modal as ModalPrimitive } from "antd";

export function Modal(
  props: React.ComponentPropsWithoutRef<typeof ModalPrimitive>
) {
  return <ModalPrimitive {...props} />;
}
