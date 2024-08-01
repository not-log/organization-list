import { useDispatch } from "react-redux";

import { AppDispatch } from "@app/store";

export const useAppDispatch: typeof useDispatch<AppDispatch> = useDispatch;
