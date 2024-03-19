import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

function Dummy() {
    
    const [movies, setMovies] = useState([]);

    const fetchMovies = () => {
      fetch('https://dummyapi.online/api/movies')
        .then(response => response.json())
        .then(data => setMovies(data))
        .catch(error => console.error('Error:', error));
    };
    useEffect(() => {
      fetchMovies();
    }, []);
  
    return (
      <div className="flex justify-center">
        <TableContainer sx={{width: 3/4 }}>
        <Table >
        {movies.map(movie => (
            <TableRow> 
                <TableCell>{movie.movie}</TableCell>
                <TableCell>{movie.rating}</TableCell>
            </TableRow>
          ))}
        </Table>
        </TableContainer>
      </div>
    );
  };

export default Dummy;