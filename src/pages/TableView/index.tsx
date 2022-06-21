import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./styles.css";

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

export default function TableView() {
  return (
    <React.Fragment>
      <div className="table-view">
        <div>
          <h2>Extrato de Movimentação do Estoque</h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Nota Fiscal</TableCell>
                <TableCell>Entrada/Saída</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Produto</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Fornecedor</TableCell>
                <TableCell>Deposito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>{`$${row.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="table-view">
        <div>
          <h2>Produtos em ponto de Reposição</h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Ponto de Reposição</TableCell>
                <TableCell>Deposito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="table-view">
        <div>
          <h2>
            Produtos em ponto de reposição x Fornecedores para cotação de compra
          </h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Ponto de Reposição</TableCell>
                <TableCell>Deposito</TableCell>
                <TableCell>Preço de Compra</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="table-view">
        <div>
          <h2>Posição Atual de Estoque Geral e por Depósito</h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Deposito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}
