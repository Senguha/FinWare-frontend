import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


function Dummy() {
  const [tableData, setTableData] = useState([]);

  const fetchCompanies = () => {
    fetch(import.meta.env.VITE_API_URL+"companies")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error:", error));
  };
  const fetchParams = () => {
    fetch(import.meta.env.VITE_API_URL+"parametres")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error:", error));
  };
  const fetchContacts = () => {
    fetch(import.meta.env.VITE_API_URL+"contactPersons")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <div className="">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={fetchCompanies}>Предприятия</Button>
            <Button onClick={fetchParams}>Показатели</Button>
            <Button onClick={fetchContacts}>Контакные лица</Button>
          </ButtonGroup>
        </div>
        <TableContainer>
          <Table>
            {tableData.map((row) => {
              return (
                <TableRow key={row.id}>
                  {Object.values(row).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dummy;
