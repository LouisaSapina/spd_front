import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { VscAccount } from "react-icons/vsc";


const ResultTable = ({results, setResults, formData, selected, columns, count, next, previous }) => {
    const generalInfoRequest = ["surname", "firstName", "patronymic"];
    const columnNames = Object.keys(generalInfoRequest)
    const fieldNames = generalInfoRequest.concat(Object.keys(formData));
    const [table, setTable] = useState([]);

    const navigate = useNavigate();

    useEffect(()=> {
        setTable(results)
        setPrevious(previous)
        setNext(next)
        // console.log("results",table);
        // console.log("results table",results);

        // console.log(nextLocal);
        // console.log(previous);
        // console.log(selected);
    })

    useEffect(() => {
        if (results) {
          setTable(results);
          // Other state updates...
        }
        // console.log("results", results);
      }, [results]);
    // const [countLocal, setCount] = useState(count)
    const [prevLocal, setPrevious] = useState('')
    const [nextLocal, setNext] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [url, setURL] = useState('')
    const handleChangePage = (event, newPage) => {
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const getColumnName = (fieldName) => {
        // console.log(columns.filter(o => o.id === fieldName)[0].label);
        return columns.filter(o => o.id === fieldName)[0].label;
    }

    const handleRowClick = (id) => {
        navigate(`/${id}`);
    };

    const removePrefix = (fieldName) => {
        const lastColonIndex = fieldName.lastIndexOf(':');
        return lastColonIndex !== -1 ? fieldName.slice(lastColonIndex + 1) : fieldName;
    };

  return (
    <Paper style={{ marginTop: '20px', borderRadius: '5px' }} sx={{  width: '80.2vw', overflow: 'hidden' }}>
        <div>
            <TableContainer sx={{  maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">

                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>Имя</TableCell>
                            <TableCell style={{ minWidth: 50 }}>Фамилия</TableCell>
                            <TableCell style={{ minWidth: 50 }}>Отчество</TableCell>
                            {selected.filter(item => item !== 'selectAll' && item !== 'firstName' && item !== 'surname' && item !== 'patronymic').map((fieldName) => {
                                return (
                                    <TableCell style={{ minWidth: 100 }} key={fieldName}>
                                        {getColumnName(fieldName)}
                                    </TableCell>
                                )
                            })}
                           
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {/* {console.log('Selected Fields:', selected)} */}
                        {table.map((person) => (
                            <TableRow 
                                key={person.id}
                                sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}
                            >
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.firstName}
                                </TableCell>
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.surname}
                                </TableCell>
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.patronymic}
                                </TableCell>
           
                                {selected
                                    .filter(item => item !== 'selectAll' && item !== 'firstName' && item !== 'surname' && item !== 'patronymic')
                                    .map((fieldName) => {
                                    return (
                                        <TableCell key={fieldName} style={{ minWidth: 50 }}>
                                            {person[removePrefix(fieldName)]}
                                        </TableCell> 
                                    )     
                                })}   
                               
                                <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button 
                                        variant="outlined" 
                                        style={{ textTransform: 'none', display: 'flex', gap: '10px', cursor: 'pointer', width: '195px' }}
                                        onClick={() => handleRowClick(person.id)}
                                    >
                                        <VscAccount />
                                        Перейти в профиль
                                    </Button>
                                </TableCell>
                            </TableRow>  
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                    rowsPerPage={2}
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                /> */}
        </div>
       
    </Paper>
  );
};

export default ResultTable;

