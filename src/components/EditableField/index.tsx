import { FC, PointerEventHandler, PropsWithChildren, useRef } from "react";

import { Typography } from "@mui/material";

type EditableFieldProps = {
  a?: unknown;
};

const EditableField: FC<PropsWithChildren<EditableFieldProps>> = ({ children }) => {
  // const

  const interactionTimeRef = useRef<number | null>(null);

  const handlePointerDown: PointerEventHandler = (event) => {
    interactionTimeRef.current = event.timeStamp;
  };

  const handlePointerUp: PointerEventHandler = (event) => {
    if (!interactionTimeRef.current) return;
    const delta = event.timeStamp - interactionTimeRef.current;

    if (delta < 250) {
      console.log("done");
    }
  };

  const interactionHandlers = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  };

  return <Typography {...interactionHandlers}>{children}</Typography>;
};

export default EditableField;
