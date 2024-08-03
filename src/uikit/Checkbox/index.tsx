import { ComponentProps, FC } from "react";

import { mergeSx } from "@app/lib";
import { Checkbox as MuiCheckbox, SxProps } from "@mui/material";

const styles: SxProps = {
  padding: 0,
};

const Checkbox: FC<ComponentProps<typeof MuiCheckbox>> = (props) => {
  return <MuiCheckbox {...props} sx={mergeSx(styles, props.sx)} />;
};

export default Checkbox;
