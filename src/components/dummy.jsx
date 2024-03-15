import React, { useState, useEffect } from 'react';

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
      <div>
        <table>
        {movies.map(movie => (
            <tr> 
                <td>{movie.movie}</td>
                <td>{movie.rating}</td>
            </tr>
          ))}
        </table>
          
        
      </div>
    );
  };

export default Dummy;