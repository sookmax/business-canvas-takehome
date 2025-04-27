import { PlusOutlined } from "@ant-design/icons";
import { Button } from "./primitives/Button";
import { Flex, Typography } from "./primitives/Layout";
import { INITIAL_FORM_FIELDS } from "../const";
import { useAppDispatch } from "../store";

export function AppHeader() {
  const dispatch = useAppDispatch();
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={1}>회원 목록</Typography.Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          dispatch((state) => {
            state.isModalOpen = true;
            state.initialFormValues = INITIAL_FORM_FIELDS;
          });
        }}
      >
        추가
      </Button>
    </Flex>
  );
}
