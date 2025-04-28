import React, { useState } from "react";
import { AppDispatch, AppState, useAppDispatch, useAppState } from "../store";
import {
  FilterDropdownProps,
  Table,
  TableColumnsType,
  TableRowSelection,
} from "./primitives/Table";
import { Flex } from "./primitives/Layout";
import { EMAIL_SUB_OPT_IN, OCCUPATIONS, RecordType } from "../const";
import { Checkbox } from "./primitives/Checkbox";
import { Dropdown, MenuProps } from "./primitives/Dropdown";
import { Button } from "./primitives/Button";
import { MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const DROPDOWN_MENU_ITEMS: MenuProps["items"] = [
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

export function RecordTable() {
  const { records } = useAppState();
  const dispatch = useAppDispatch();

  return <RecordTableInner records={records} dispatch={dispatch} />;
}

const RecordTableInner = React.memo(function RecordTableInner({
  records,
  dispatch,
}: {
  records: AppState["records"];
  dispatch: AppDispatch;
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<RecordType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSelectedRowsDelete = () => {
    dispatch((state) => {
      state.records = records.filter(
        (record) => !selectedRowKeys.includes(record.key)
      );
    });
    setSelectedRowKeys([]);
  };

  const handleRowDelete = (key: React.Key) => {
    dispatch((state) => {
      state.records = records.filter((record) => record.key !== key);
    });
  };

  const columns: TableColumnsType<RecordType> = [
    {
      title: "이름",
      dataIndex: "name",
      filterDropdown: getCustomFilterDropdown(records, "name"),
      onFilter: (value, record) => record.name.startsWith(value as string),
    },
    {
      title: "주소",
      dataIndex: "address",
      filterDropdown: getCustomFilterDropdown(records, "address"),
      onFilter: (value, record) => record.address.startsWith(value as string),
    },
    {
      title: "메모",
      dataIndex: "memo",
      filterDropdown: getCustomFilterDropdown(records, "memo"),
      onFilter: (value, record) => record.memo.startsWith(value as string),
    },
    {
      title: "가입일",
      dataIndex: "sign-up-date",
      filterDropdown: getCustomFilterDropdown(records, "sign-up-date"),
      onFilter: (value, record) =>
        record["sign-up-date"].startsWith(value as string),
    },
    {
      title: "직업",
      dataIndex: "occupation",
      filterDropdown: getCustomFilterDropdown(records, "occupation"),
      onFilter: (value, record) =>
        record.occupation.startsWith(value as string),
    },
    {
      title: "이메일 수신 동의",
      dataIndex: "email-subscription",
      filterDropdown: getCustomFilterDropdown(records, "email-subscription"),
      onFilter: (value, record) =>
        record["email-subscription"].startsWith(value as string),
      render: (value) => (
        <Checkbox
          aria-label="email-subscription-checkbox"
          checked={value === "선택됨" ? true : false}
        />
      ),
    },
    {
      render: (_cell, row) => {
        const onClick: MenuProps["onClick"] = ({ key }) => {
          if (key === "delete") {
            handleRowDelete(row.key);
          } else if (key === "edit") {
            dispatch((state) => {
              state.initialFormValues = {
                key: row.key,
                name: row.name,
                address: row.address,
                memo: row.memo,
                "sign-up-date": dayjs(row["sign-up-date"]),
                occupation:
                  OCCUPATIONS.find(
                    (occupation) => occupation.label === row.occupation
                  )?.value ?? OCCUPATIONS[0].value,
                "email-subscription":
                  row["email-subscription"] === EMAIL_SUB_OPT_IN ? true : false,
              };
              state.isModalOpen = true;
            });
          }
        };

        return (
          <Dropdown
            menu={{ items: DROPDOWN_MENU_ITEMS, onClick }}
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
    <Flex vertical gap={8}>
      <Flex>
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
      </Flex>
      <Table<RecordType>
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={records}
      />
    </Flex>
  );
});

function getCustomFilterDropdown(
  records: AppState["records"],
  fieldId: Exclude<keyof RecordType, "key">
) {
  return ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
    const uniqueFieldValues = Array.from(
      new Set(records.map((record) => record[fieldId]))
    );
    uniqueFieldValues.sort();
    return (
      <Flex vertical style={{ padding: 8 }}>
        {uniqueFieldValues.map((value) => (
          <Flex key={value} style={{ padding: 8 }}>
            <Checkbox
              checked={selectedKeys.includes(value)}
              onChange={(e) => {
                setSelectedKeys(
                  e.target.checked
                    ? [...selectedKeys, value]
                    : selectedKeys.filter((key) => key !== value)
                );
                confirm({ closeDropdown: false });
              }}
            >
              {value}
            </Checkbox>
          </Flex>
        ))}
      </Flex>
    );
  };
}
