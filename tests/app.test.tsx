import React from "react";
import { App } from "../src/App";
import { expect, test } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import dayjs from "dayjs";

test("can render app screen correctly", async () => {
  const screen = page.render(<App />);

  expect(screen.getByRole("heading", { name: "회원 목록" })).toBeVisible();
  expect(screen.getByRole("button", { name: "추가" })).toBeVisible();

  ["이름", "주소", "메모", "가입일", "직업", "이메일 수신 동의"].forEach(
    (columnName) => {
      expect(
        screen
          .getByRole("table")
          .getByRole("columnheader", { name: columnName })
      ).toBeVisible();

      expect(
        screen
          .getByRole("table")
          .getByRole("columnheader", { name: columnName })
          .getByRole("button", { name: "filter" })
      ).toBeVisible();
    }
  );

  const rows = screen
    .getByRole("table")
    .element()
    .querySelectorAll("tbody > .ant-table-row");
  expect(rows).toHaveLength(2);

  [
    ["John Doe", "서울 강남구", "외국인", "2024-10-02", "개발자", true],
    ["Foo Bar", "서울 서초구", "한국인", "2024-10-01", "PO", false],
  ].forEach((values, idx) => {
    const row = rows[idx];
    expect(row.textContent).toBe(values.slice(0, values.length - 1).join(""));

    const checkbox = row.querySelector(
      ".ant-table-cell:not(.ant-table-selection-column) input"
    );

    expect(checkbox).toBeVisible();
    expect((checkbox as HTMLInputElement).checked).toBe(
      values[values.length - 1]
    );

    const actionButton = row.querySelector(
      ".ant-table-cell:last-child .ant-btn:has(.anticon-more)"
    );
    expect(actionButton).toBeVisible();
  });
});

test("can add new record", async () => {
  const screen = page.render(<App />);

  const addButton = screen.getByRole("button", { name: "추가" });
  await addButton.click();

  expect(screen.getByRole("dialog", { name: "회원 추가" })).toBeVisible();
  expect(
    screen
      .getByRole("dialog", { name: "회원 추가" })
      .getByRole("button", { name: "저장" })
  ).toBeDisabled();

  const DATA = {
    name: "Sook",
    address: "경기 분당구",
    memo: "일본인",
    signUpDate: dayjs().format("YYYY-MM-DD"),
    occupation: "디자이너",
    emailSubscription: true,
  };

  await screen
    .getByRole("dialog", { name: "회원 추가" })
    .getByLabelText("이름")
    .fill(DATA.name);

  expect(
    screen.getByRole("dialog", { name: "회원 추가" }).getByLabelText("이름")
  ).toHaveValue(DATA.name);

  expect(
    screen
      .getByRole("dialog", { name: "회원 추가" })
      .getByRole("button", { name: "저장" })
  ).toBeDisabled();

  await screen
    .getByRole("dialog", { name: "회원 추가" })
    .getByLabelText("주소")
    .fill(DATA.address);

  expect(
    screen.getByRole("dialog", { name: "회원 추가" }).getByLabelText("주소")
  ).toHaveValue(DATA.address);

  expect(
    screen
      .getByRole("dialog", { name: "회원 추가" })
      .getByRole("button", { name: "저장" })
  ).toBeDisabled();

  await screen
    .getByRole("dialog", { name: "회원 추가" })
    .getByLabelText("메모")
    .fill(DATA.memo);

  expect(
    screen.getByRole("dialog", { name: "회원 추가" }).getByLabelText("메모")
  ).toHaveValue(DATA.memo);

  expect(
    screen
      .getByRole("dialog", { name: "회원 추가" })
      .getByRole("button", { name: "저장" })
  ).toBeDisabled();

  await screen
    .getByRole("dialog", { name: "회원 추가" })
    .getByLabelText("가입일")
    .click();

  const datePickerDropdown = document.querySelector(".ant-picker-dropdown");
  await expect.element(datePickerDropdown).toBeVisible();

  const datePickerCell = datePickerDropdown!.querySelector(
    `[title="${DATA.signUpDate}"]`
  );

  expect(datePickerCell).toBeVisible();
  await userEvent.click(datePickerCell!);

  await expect.element(datePickerDropdown).not.toBeVisible();

  expect(
    screen.getByRole("dialog", { name: "회원 추가" }).getByLabelText("가입일")
  ).toHaveValue(DATA.signUpDate);

  const dialog = screen.getByRole("dialog", { name: "회원 추가" }).element();
  const occupationSelect = dialog.querySelector(".ant-select");

  await userEvent.click(occupationSelect!);

  const occupationSelectDropdown = document.querySelector(
    ".ant-select-dropdown"
  );
  await expect.element(occupationSelectDropdown).toBeVisible();

  await userEvent.click(
    occupationSelectDropdown!.querySelector(`[title="${DATA.occupation}"]`)!
  );

  await expect.element(occupationSelectDropdown).not.toBeVisible();

  expect(occupationSelect).toHaveTextContent(DATA.occupation);

  if (DATA.emailSubscription) {
    await screen
      .getByRole("dialog", { name: "회원 추가" })
      .getByLabelText("이메일 수신 동의")
      .click();
  }

  await expect
    .element(
      screen
        .getByRole("dialog", { name: "회원 추가" })
        .getByLabelText("이메일 수신 동의")
    )
    .toBeChecked();
});
