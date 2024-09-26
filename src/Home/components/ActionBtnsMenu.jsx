import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import FormDialog from "./FormDialog";
import DeleteDialog from "./DeleteDialog";

function ActionBtnsMenu(props) {
  const { row, fetchProducts ,loading ,setLoading} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickEdit = () => {
    setOpenDialog(true);
    handleClose();
  };

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };

  return (
    <div>
      <FormDialog {...{ setOpen: setOpenDialog, open: openDialog, row, fetchProducts }} />
      <DeleteDialog
        {...{
          openDialog: openDeleteDialog,
          setOpenDialog: setOpenDeleteDialog,
          row,
          fetchProducts,
          loading,
          setLoading
        }}
      />

      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="action-btn"
      >
        <FaEllipsisV />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleClickEdit}
          className="menu-item"
          sx={{ fontSize: "14px" }}
        >
          <FaEdit /> Edit
        </MenuItem>
        <MenuItem
          onClick={handleClickDelete}
          className="menu-item"
          sx={{ fontSize: "14px" }}
        >
          <FaTrash /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ActionBtnsMenu;
