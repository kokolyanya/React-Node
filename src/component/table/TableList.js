import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState, useEffect } from 'react';
import './TableList.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable(props) {
  const [state, setState]=useState([])    /*useState manao manipulation ana etat*/
  let variable=props.changement;
  useEffect(()=>{
    fetch("http://localhost:8081/connected")
    .then(reponse=>reponse.json())
    .then(data=>{
      setState(data)
    })
    .catch((err)=>{
      alert("error"+err.message)
    })
  },[variable])     /*si on ne met pas de variable qui ne change pas, useEffect se fait en boucle infinie*/
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <tableContainer>
      <table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <thead>
          <tr>
            <td>Username</td>
            <td align="right">E-mail</td>
            <td align="right">Group</td>
            <td align="right">ID</td>
            <td align="right">Password</td>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : state
          ).map((row) => (
            <tr key={row.id}>
              <td component="th"  style={{ width: 200 }} >
                {row.userName}    {/* mifanaraka @base de donnee */}
              </td>
              <td style={{ width: 200 }} align="right" >
                {row.email}
              </td>
              <td style={{ width: 200 }} align="right">
                {row.groupe}
              </td>
              <td style={{ width: 200 }} align="right">
              {row.id}
              </td>
              <td style={{ width: 200 }} align="right">
              {row.password}
              </td>
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={state.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </table>
    </tableContainer>
  );
}
