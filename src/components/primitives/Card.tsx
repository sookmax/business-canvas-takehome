import { Card as CardPrimitive } from "antd";

export function Card(
  props: React.ComponentPropsWithoutRef<typeof CardPrimitive>
) {
  return <CardPrimitive {...props} />;
}
