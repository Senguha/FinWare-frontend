import React from 'react';
import Paper from "@mui/material/Paper";
import { Box } from '@mui/material';



function Navbar() {
    return (  
        <Box component={Paper}>
        <nav className="flex p-4 font-bold" >
            <h1 className="p-2 text-xl">Nav 1</h1>
            <h1 className='p-2 text-xl'>Nav 2</h1>
            <h1 className='p-2 text-xl'>Nav 3</h1>
        </nav>
        </Box>
        
    );
}

export default Navbar;