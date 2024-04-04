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
    <div className="flex flex-col items-center my-12 w-full px-6">
        <div className="flex items-center mb-6 flex-wrap gap-1">
            <Button variant="outlined" onClick={()=> fetchTable("parametres")}>Показатели</Button>
            <Button variant="outlined" onClick={()=> fetchTable("companies")}>Предприятия</Button>
            <Button variant="outlined" onClick={()=> fetchTable("parameteresTypes")}>Виды показателей</Button>
            <Button variant="outlined" onClick={()=> fetchTable("contactPersons")}>Контакные лица</Button>
            <Button variant="outlined" onClick={()=> fetchTable("countries")}>Страны</Button>
            <Button variant="outlined" onClick={()=> fetchTable("reports")}>Отчёты</Button>
            <Button variant="outlined" onClick={()=> fetchTable("users")}>Пользователи</Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow key={"0"}>
              {tableColumns.map((field,i) => {
                return <TableCell key={i}>{field.name}</TableCell>;
              })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {Object.values(row).map((value,i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>   
      </div>
  );
}

export default Dummy;
