import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { WindowPortal } from '../WindowPortal';

import { transformRegionsData, formatDate } from './utils';

import { regions } from '../../data/regions-data';
import { users } from '../../data/users-data';

import './style.css';

const { rows, years } = transformRegionsData(regions);
const currentDate = formatDate(Date.now());

const MainTable = () => {
  const [open, setOpen] = React.useState(false);
  const [usersData, setUsersData] = React.useState(users);

  const closeWindowPortal = () => setOpen(false);

  React.useEffect(() => {
    window.addEventListener('beforeunload', () => closeWindowPortal());
  });

  const handleClick = (evt) => setOpen(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { value, date, user, comment } = evt.target.elements;
    const lastId = Math.max(...usersData.map((user) => user.id));

    setUsersData((prevState) => [
      ...prevState,
      {
        id: lastId + 1,
        value: value.value,
        date: date.value,
        user: user.value,
        comment: comment.value,
      },
    ]);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell rowSpan='2'>regions</TableCell>
              {years.map((year) => (
                <TableCell key={year} colSpan='3' align='center'>
                  {year}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {years.map((year) => (
                <>
                  <TableCell key={`${year}-xx`} align='left'>
                    xx
                  </TableCell>
                  <TableCell key={`${year}-yy`} align='left'>
                    yy
                  </TableCell>
                  <TableCell key={`${year}-zz`} align='left'>
                    zz
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.regionName}>
                <TableCell key={row.regionName} component='th' scope='row'>
                  {row.regionName}
                </TableCell>
                {years.map((year) =>
                  row[year].map((value, i) => (
                    <TableCell
                      key={`${row.regionName}-${year}-${i}`}
                      onClick={value !== '-' ? handleClick : null}
                      style={value !== '-' ? {} : { cursor: 'not-allowed' }}
                    >
                      {value}
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open ? (
        <WindowPortal closeWindowPortal={closeWindowPortal}>
          <div className='container'>
            <table className='user-table'>
              <thead>
                <tr>
                  <th>value</th>
                  <th>date</th>
                  <th>user</th>
                  <th>comment</th>
                </tr>
              </thead>
              <tbody>
                {usersData &&
                  usersData.map(({ id, value, date, user, comment }) => (
                    <tr key={id}>
                      <td>{value}</td>
                      <td>{date}</td>
                      <td>{user}</td>
                      <td>{comment}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className='row-form'>
              <form className='user-form' onSubmit={handleSubmit}>
                <input type='number' min='0' step='1' name='value' required />
                <input
                  type='text'
                  name='date'
                  defaultValue={currentDate}
                  required
                />
                <input type='text' name='user' defaultValue='Julia' required />
                <input type='text' name='comment' />
                <button type='submit'>Add</button>
              </form>
              <button
                className='button-close'
                type='button'
                onClick={closeWindowPortal}
              >
                Close
              </button>
            </div>
          </div>
        </WindowPortal>
      ) : null}
    </>
  );
};

export { MainTable };
