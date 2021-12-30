import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IClient } from '../../../../interfaces/IClient';
import { getGender } from '../../../../utils/getGender';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

interface ListProps {
  clients: IClient[];
  handleDelete: (payload: IClient) => void;
  handleEdit: (client: IClient) => void;
}

function List({ clients, handleDelete, handleEdit }: ListProps): React.ReactElement {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Nome</StyledTableCell>
            <StyledTableCell align="left">Dt Nascimento</StyledTableCell>
            <StyledTableCell align="left">Sexo</StyledTableCell>
            <StyledTableCell align="left">E-mail</StyledTableCell>
            <StyledTableCell align="center">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <StyledTableRow key={client.id}>
              <StyledTableCell align="left">{client.id}</StyledTableCell>
              <StyledTableCell align="left">{client.name}</StyledTableCell>
              <StyledTableCell align="left">{moment(client.birthDate).format("DD/MM/YYYY")}</StyledTableCell>
              <StyledTableCell align="left">{getGender(client.gender)}</StyledTableCell>
              <StyledTableCell align="left">{client.email}</StyledTableCell>
              <StyledTableCell align="left">
                <Grid display="flex" justifyContent="space-evenly" alignItems="center">
                <IconButton 
                  color="primary" 
                  aria-label="edit an client"
                  onClick={() => handleEdit(client)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="warning" 
                  aria-label="delete an client"
                  onClick={() => handleDelete(client)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                </Grid>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List;
