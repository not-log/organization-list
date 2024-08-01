import { SxProps, Theme } from "@mui/material";

type SxProperty = SxProps<Theme>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeSx = (...sx: (SxProperty | SxProperty[] | null | undefined | false)[]): any[] => {
  const flatSxObjects = sx.filter((sxObject) => sxObject).flatMap((sxObject): unknown => sxObject);
  return flatSxObjects;
};
