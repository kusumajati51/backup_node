import {
  Avatar,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

TableViewCustom.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  limitList: PropTypes.array.isRequired,
  itemsHeader: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sort: PropTypes.string,
      text: PropTypes.shape({
        value: PropTypes.string,
        align: PropTypes.oneOf(["right", "left", "center"]),
      }),
      image: PropTypes.shape({
        server: PropTypes.shape({
          base_url: PropTypes.string,
          path: PropTypes.string,
        }),
        alt_text: PropTypes.string,
        src: PropTypes.string,
      }),
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          onAction: PropTypes.func,
          type: PropTypes.any,
        })
      ),
    })
  ),
  itemsContent: PropTypes.array,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

TableViewCustom.defaultProps = {
  rowCount: 0,
  limitList: [5, 10, 25],
  page: 1,
  limit: 10,
};

export default function TableViewCustom(props) {
  const {
    order,
    orderBy,
    rowCount,
    onRequestSort,
    onPageChange,
    onLimitChange,
    itemsHeader,
    itemsContent,
    limitList,
    page,
    limit,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const createSwitchPage = (event, newPage) => {
    onPageChange(event, newPage + 1);
  };

  const createLimitChange = (event) => {
    onLimitChange(event, parseInt(event.target.value, 10));
  };
  const createActionClick = (action, item) => (event) => {
    action.onAction(event, item);
  };

  const getDataText = (paramDot, item) => {
    var text = "";
    var data = item;
    paramDot.forEach((element) => {
      data = data[element];
    });
    text = data;
    return text;
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                {itemsHeader.map((item, index) => {
                  if (item.sort) {
                    return (
                      <TableCell
                        align={item.align}
                        key={index}
                        sortDirection={orderBy === item.sort ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === item.sort}
                          direction={orderBy === item.sort ? order : "asc"}
                          onClick={createSortHandler(item.sort)}
                        >
                          {item.name}
                        </TableSortLabel>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={index} align={item.align}>
                        {item.name ? item.name : ""}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsContent.map((item, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    {itemsHeader.map((itemHeader, index) => {
                      if (itemHeader.image) {
                        return (
                          <TableCell key={index} align={itemHeader.align}>
                            <Avatar
                              src={
                                itemHeader.image.server
                                  ? itemHeader.image.server.base_url +
                                    item[itemHeader.image.server.path]
                                  : item[itemHeader.image.src]
                              }
                              alt={
                                itemHeader.image.alt_text
                                  ? item[itemHeader.image.alt_text]
                                  : ""
                              }
                            />
                          </TableCell>
                        );
                      } else if (itemHeader.text) {
                        return (
                          <TableCell key={index} align={itemHeader.align}>
                            {itemHeader.text.value.includes(".")
                              ? getDataText(
                                  itemHeader.text.value.split("."),
                                  item
                                )
                              : item[itemHeader.text.value]}
                          </TableCell>
                        );
                      } else if (itemHeader.actions) {
                        return (
                          <TableCell key={index} align={itemHeader.align}>
                            {itemHeader.actions.map((action, index) => {
                              return (
                                <Box
                                  onClick={createActionClick(action, item)}
                                  component={action.type}
                                  key={index}
                                >
                                  {action.label}
                                </Box>
                              );
                            })}
                          </TableCell>
                        );
                      } else {
                        return <TableCell key={index}></TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={limitList}
                  count={rowCount}
                  page={page - 1}
                  rowsPerPage={limit}
                  onPageChange={createSwitchPage}
                  onRowsPerPageChange={createLimitChange}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
