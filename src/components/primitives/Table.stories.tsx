import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import {
  FilterDropdownProps,
  Table,
  TableColumnsType,
  TableRowSelection,
} from "./Table";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { MoreOutlined } from "@ant-design/icons";
import { RECORDS, RecordType } from "../../const";
import { Dropdown, MenuProps } from "./Dropdown";
import { Flex } from "./Layout";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "80vw" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

function TableExampleComponent() {
  const [dataSource, setDataSource] = useState<RecordType[]>(RECORDS);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<RecordType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSelectedRowsDelete = () => {
    const newDataSource = dataSource.filter(
      (record) => !selectedRowKeys.includes(record.key)
    );
    setDataSource(newDataSource);
    setSelectedRowKeys([]);
  };

  const handleRowDelete = (key: React.Key) => {
    setDataSource((dataSource) =>
      dataSource.filter((record) => record.key !== key)
    );
  };

  const getCustomFilterDropdown = (
    fieldId: Exclude<keyof RecordType, "key">
  ) => {
    return ({
      setSelectedKeys,
      selectedKeys,
      confirm,
    }: FilterDropdownProps) => {
      return (
        <Flex vertical style={{ padding: 8 }}>
          {dataSource.map((record) => (
            <Flex key={record.key} style={{ padding: 8 }}>
              <Checkbox
                checked={selectedKeys.includes(record[fieldId])}
                onChange={(e) => {
                  setSelectedKeys(
                    e.target.checked
                      ? [...selectedKeys, record[fieldId]]
                      : selectedKeys.filter((key) => key !== record[fieldId])
                  );
                  confirm({ closeDropdown: false });
                }}
              >
                {record[fieldId]}
              </Checkbox>
            </Flex>
          ))}
        </Flex>
      );
    };
  };

  const columns: TableColumnsType<RecordType> = [
    {
      title: "이름",
      dataIndex: "name",
      filterDropdown: getCustomFilterDropdown("name"),
      onFilter: (value, record) => record.name.startsWith(value as string),
    },
    {
      title: "주소",
      dataIndex: "address",
      filterDropdown: getCustomFilterDropdown("address"),
      onFilter: (value, record) => record.address.startsWith(value as string),
    },
    {
      title: "메모",
      dataIndex: "memo",
      filterDropdown: getCustomFilterDropdown("memo"),
      onFilter: (value, record) => record.memo.startsWith(value as string),
    },
    {
      title: "가입일",
      dataIndex: "sign-up-date",
      filterDropdown: getCustomFilterDropdown("sign-up-date"),
      onFilter: (value, record) =>
        record["sign-up-date"].startsWith(value as string),
    },
    {
      title: "직업",
      dataIndex: "occupation",
      filterDropdown: getCustomFilterDropdown("occupation"),
      onFilter: (value, record) =>
        record.occupation.startsWith(value as string),
    },
    {
      title: "이메일 수신 동의",
      dataIndex: "email-subscription",
      filterDropdown: getCustomFilterDropdown("email-subscription"),
      onFilter: (value, record) =>
        record["email-subscription"].startsWith(value as string),
      render: (value) =>
        value === "선택됨" ? (
          <Checkbox checked={true} />
        ) : (
          <Checkbox checked={false} />
        ),
    },
    {
      render: (_cell, row) => {
        const onClick: MenuProps["onClick"] = ({ key }) => {
          if (key === "delete") {
            handleRowDelete(row.key);
          }
        };

        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "수정",
          },
          {
            type: "divider",
          },
          {
            key: "delete",
            label: "삭제",
            danger: true,
          },
        ];

        return (
          <Dropdown
            menu={{ items, onClick }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ width: 180 }}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
      width: 48,
    },
  ];

  return (
    <div>
      <Button
        onClick={onSelectedRowsDelete}
        disabled={selectedRowKeys.length === 0}
        style={{
          transition: "none",
          visibility: selectedRowKeys.length > 0 ? "visible" : "hidden",
        }}
      >
        {selectedRowKeys.length}행 삭제
      </Button>
      <Table<RecordType>
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
}

export const Default: Story = {
  render: TableExampleComponent,
};
