import { ThemeConfig } from "antd";
import { Dayjs } from "dayjs";

export const GLOBAL_THEME: ThemeConfig = {
  // https://ant.design/docs/react/css-variables#disable-hash
  cssVar: { key: "antd" },
  hashed: false,
};

export const OCCUPATIONS = [
  {
    value: "swe",
    label: "개발자",
  },
  {
    value: "po",
    label: "PO",
  },
  {
    value: "designer",
    label: "디자이너",
  },
];

export const INITIAL_FORM_FIELDS = {
  key: null as number | null,
  name: null as string | null,
  address: null as string | null,
  memo: null as string | null,
  "sign-up-date": null as Dayjs | null,
  occupation: OCCUPATIONS[0].value,
  "email-subscription": false,
};

export type FormFields = {
  [P in keyof Pick<
    typeof INITIAL_FORM_FIELDS,
    "name" | "sign-up-date"
  >]: NonNullable<(typeof INITIAL_FORM_FIELDS)[P]>;
} & Omit<typeof INITIAL_FORM_FIELDS, "name" | "sign-up-date" | "key">;

export const EMAIL_SUB_OPT_IN = "선택됨";
export const EMAIL_SUB_OPT_OUT = "선택 안함";

export type RecordType = (typeof RECORDS)[number];
export const RECORDS = [
  {
    key: 1,
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    "sign-up-date": "2024-10-02",
    occupation: OCCUPATIONS[0].label,
    "email-subscription": EMAIL_SUB_OPT_IN,
  },
  {
    key: 2,
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    "sign-up-date": "2024-10-01",
    occupation: OCCUPATIONS[1].label,
    "email-subscription": EMAIL_SUB_OPT_OUT,
  },
];
