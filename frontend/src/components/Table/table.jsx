import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton, Tooltip } from '@mui/material';
import EditIcon from '../../Edit code.svg';
import DeleteIcon from '../../delete.svg';

export default function DataTable({ filteredData, setView, setItem, doDelete }) {
  console.log('====================================');
  console.log("filteredData",filteredData);
  console.log('====================================');
  const columns = [
    { field: 'Name', headerName: 'Record name', width: 200 },
    { field: 'Type', headerName: 'Type', width: 200 },
    // { field: 'postedOn', headerName: 'Routing Policy', width: 150 },
    { 
      field: 'ResourceRecords', 
      headerName: 'Value/Route traffic to', 
      width: 300,
      renderCell: (params) => (
        <div style={{overflow:"auto"}} >
        {params.row.ResourceRecords.map((item, index) => (
          <Typography  sx={{marginTop:"5px"}}key={index} variant="body2">
            {item.Value}
          </Typography>
        ))}
      </div>
      ),
    },
    { field: 'TTL', headerName: 'TTL (seconds)', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      // width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <img src={EditIcon}
              onClick={() => handleEdit(params.row)}
              aria-label="edit"
            />
              
          </Tooltip>
          <Tooltip title="Delete">
            <img src={DeleteIcon}
               onClick={() => handleDelete(params.row)}
              aria-label="delete"
            />
            
          </Tooltip>
        </>
      ),
    },
  ];

  const handleEdit = (row) => {
    setItem(row);
    setView(true);
    console.log(`Edit row with id ${row.id}`, row);
  };

  const handleDelete = (row) => {
    doDelete(row);
    console.log(`Delete row with id ${row.id}`);
  };

  return (
    <div style={{ height: 400, width: '95%',background:"white" }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        getRowHeight={() => 'auto'}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
