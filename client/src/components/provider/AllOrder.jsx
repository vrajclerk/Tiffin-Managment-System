import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import OrderActionMenu from './OrderAction';
import { CircularProgress } from '@mui/material';
import ProductionQuantityLimitsSharpIcon from '@mui/icons-material/ProductionQuantityLimitsSharp';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a2225',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

export default function AllOrder() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [activeOrder, setActiveOrder] = useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterOrders = (order) => {
    const searchString = searchTerm.toLowerCase();
    return (
      order.user.name.toLowerCase().includes(searchString) ||
      order.food.some((food) => food.name.toLowerCase().includes(searchString)) ||
      order._id.toLowerCase().includes(searchString)
    );
  };

  let { orders, loading } = useSelector((state) => state.orders);

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center' style={{ height: '85vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (orders && orders.length <= 0) {
    return (
      <div className='flex items-center justify-center w-full py-3'>
        <p className='text-gray-500 text-lg'>No Orders Found</p>
      </div>
    );
  }

  return (
    <>
      {orders && (
        <div className=''>
          {/* Search input field */}
         <div className="flex items-center mb-4">
  <input
    type="text"
    placeholder="Search by user, food, or order ID"
    className="p-2 border border-gray-300 rounded-md text-left w-full max-w-md mr-2 outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    type="button"
    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
   
  >
    Search
  </button>
</div>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: '100%' }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                <StyledTableCell align='center' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">Order Id</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">Date</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">Time</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/4 lg:w-1/6 whitespace-nowrap">User Name</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/4 lg:w-1/6 whitespace-nowrap">User Number</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/3 lg:w-1/6 whitespace-nowrap ">Food Name </StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/3 lg:w-1/6 whitespace-nowrap ">Quantity </StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/3 lg:w-1/6 whitespace-nowrap ">Food Price</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">TotalPrice</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/4 lg:w-1/3 whitespace-nowrap">{"Address"}</StyledTableCell>
                <StyledTableCell align='center' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">PaymentStatus</StyledTableCell>
                <StyledTableCell align='start' className="sm:w-1/6 lg:w-1/10 whitespace-nowrap">OrderStatus</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                    .filter((order) => order.orderStatus === "Delivered" || order.orderStatus === "Cancelled")
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, index) => (
                  // Add this condition to filter orders based on the search term
                  filterOrders(order) && (
                    <StyledTableRow key={index}>
                      <StyledTableCell align='center'>
                        {order?._id}
                      </StyledTableCell>
                      <StyledTableCell align='center' className='whitespace-nowrap'>{order?.date}</StyledTableCell>
                      <StyledTableCell align='center'>{order?.time}</StyledTableCell>
                      <StyledTableCell align='center'>{order?.user?.name}</StyledTableCell>
                      <StyledTableCell align='center'>{order?.user?.phoneNumber}</StyledTableCell>
                      <StyledTableCell align='center' className='whitespace-nowrap'>
                        {order?.food ? (
                          order.food.map((food, foodIndex) => (
                            <div key={foodIndex}>
                               <div>
                              {food.name} 
                              </div>
                             
                            </div>
                            
                          ))
                        ) : (
                          'Food Deleted'
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center' className='whitespace-nowrap'>
                        {order?.food ? (
                          order.food.map((food, foodIndex) => (
                            <div key={foodIndex}>
                               <div>
                              {food.amount}
                              </div>
                             
                            </div>
                            
                          ))
                        ) : (
                          'Food Deleted'
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center' className='whitespace-nowrap'>
                        {order?.food ? (
                          order.food.map((food, foodIndex) => (
                            <div key={foodIndex}>
                               <div>
                               ₹{food.price}
                              </div>
                             
                            </div>
                            
                          ))
                        ) : (
                          'Food Deleted'
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>₹{order?.totalAmount}</StyledTableCell>
                      <StyledTableCell align='center' className='whitespace-nowrap'>{order?.address}</StyledTableCell>
                      <StyledTableCell align='center'>{order?.paymentStatus}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <div className='flex items-center gap-2'>
                          {console.log(order.orderStatus)}
                          <span>{order.orderStatus}</span>
                          {order.orderStatus === "Ordered" && (
                            <span onClick={() => setActiveOrder(order)}>
                              <OrderActionMenu order={activeOrder} />
                            </span>
                          )}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[8, 16, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={3} //orders.length
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
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
