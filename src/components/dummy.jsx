import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";

function Dummy() {
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const fetchTable = (tableName) => {
    fetch(import.meta.env.VITE_API_URL + tableName)
      .then((response) => response.json())
      .then((data) => {
        setTableRows(data.rows);
        setTableColumns(data.fields);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchTable("companies");
  }, []);

  return (
    <div className="flex flex-col items-center m-12">
      <div className="w-3/4">
        <div className="mb-6">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={()=> fetchTable("companies")}>Предприятия</Button>
            <Button onClick={()=> fetchTable("parametres")}>Показатели</Button>
            <Button onClick={()=> fetchTable("contactPersons")}>Контакные лица</Button>
            <Button onClick={()=> fetchTable("countries")}>Страны</Button>
            <Button onClick={()=> fetchTable("reports")}>Отчёты</Button>
            <Button onClick={()=> fetchTable("users")}>Пользователи</Button>
          </ButtonGroup>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {tableColumns.map((field) => {
                return <TableCell>{field.name}</TableCell>;
              })}
            </TableHead>
            <TableBody>
              {tableRows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {Object.values(row).map((value) => (
                      <TableCell>{value}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Dummy;
