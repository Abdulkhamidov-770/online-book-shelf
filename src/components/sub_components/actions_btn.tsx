import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const actions = [
  { icon: <EditIcon />, name: "Edit" },
  { icon: <DeleteIcon />, name: "Delete" },
];
type PropsType = {
  HandleAction: (a: string) => void;
};
export default function ActionsBtn(props: PropsType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box className="dial-box">
      <Backdrop open={open} />
      <SpeedDial
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        icon={<SpeedDialIcon />}
        className="speed-dial-btns"
        ariaLabel="SpeedDial tooltip example"
      >
        {actions &&
          actions?.map((action) => (
            <SpeedDialAction
              id={action.name}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                props.HandleAction(action.name);
              }}
            />
          ))}
      </SpeedDial>
    </Box>
  );
}
