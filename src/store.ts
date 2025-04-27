import { INITIAL_FORM_FIELDS, RECORDS, RecordType } from "./const";
import createStore from "./utils/createStore";

let initialRecords = RECORDS;
if (import.meta.env.VITE_STORAGE === "local-storage") {
  const records = localStorage.getItem("records");
  if (records) {
    initialRecords = JSON.parse(records) as RecordType[];
  }
}

const initialState = {
  records: initialRecords,
  isModalOpen: false,
  initialFormValues: INITIAL_FORM_FIELDS,
};

export type AppState = typeof initialState;
export type AppDispatch = ReturnType<typeof store.useDispatch>;

const store = createStore(initialState);

export const AppContextProvider = store.ContextProvider;
export const useAppState = store.useState;
export const useAppDispatch = store.useDispatch;
