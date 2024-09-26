import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";

import { BASE_URL } from "../../config";

const columns = [
  { id: "name", label: "Name" },
  { id: "price", label: "Price", format: (value) => value?.toFixed(2) },
  {
    id: "stock",
    label: "Stock",
  },
];

function ProductsTable(props) {
  const { productsArr, } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = productsArr.sort((a, b) => {
    const isAsc = order === "asc";
    let aValue = a[orderBy] ?? "";
    let bValue = b[orderBy] ?? "";

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
    }
    if (typeof bValue === "string") {
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return isAsc ? -1 : 1;
    }
    if (aValue > bValue) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <TableContainer sx={{ maxHeight: "100%", flex: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: "100px" }}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const imageUrl = row.imageUrl ? BASE_URL + row.imageUrl : "";
                return (
                  <TableRow
                    hover={row.stock}
                    key={row.id}
                    sx={{
                      backgroundColor: !row.stock ? "#d3d3d3" : "",
                      cursor: !row.stock ? "auto" : "pointer",
                    }}
                  >
                    <TableCell sx={{ width: "42px" }}>
                      <div
                        className={`img-section ${
                          imageUrl ? "" : "placholder"
                        }`}
                      >
                        {imageUrl && <img src={imageUrl} alt="" />}
                      </div>
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value || "Out Of Stock"}
                        </TableCell>
                      );
                    })}

                    <TableCell sx={{ width: "80px" }}></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          "@media (max-width: 480px)": {
            ".MuiTablePagination-actions": {
              marginLeft: "0",
            },
            ".MuiToolbar-root": {
              paddingX: "0",
            },
            ".MuiInputBase-root": {
              marginRight: "0",
            },
            ".MuiButtonBase-root": {
              padding: "2px",
            },
            ".MuiSelect-select": {
              marginLeft: "-10px",
            },
            ".MuiTablePagination-displayedRows": {
              marginLeft: "10px",
            },
          },
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productsArr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ProductsTable;
