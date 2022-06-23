import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./styles.css";
import api from "../../services/api";

// Generate Order Data
interface IExtratoAPI {
  id: string;
  data: string;
  nota_FISCAL: string;
  entrada_SAIDA: string;
  valor: number;
  produto: string;
  quantidade: string;
  fornecedor: string;
  deposito: string;
}

interface IReposicaoProdAPI {
  id_REP: string;
  nom_DEPOS: string;
  nom_PROD: string;
  num_QTD_ESTOQUE: number;
  num_QTD_REPOS: number;
}

interface IReposicaoFornecAPI {
  id: string;
  nom_DEPOS: string;
  nom_FORNEC: string;
  nom_PROD: string;
  num_QTD_ESTOQUE: number;
  num_QTD_REPOS: number;
  num_CUSTO_UN_PROD: number;
  dte: Date;
}

interface IPosicaoAPI {
  id: number;
  produto: string;
  deposito: string;
  saldo: number;
}

export default function TableView() {
  const [extratoRow, setExtratoRow] = React.useState<IExtratoAPI[]>([]);
  const [reposicaoProdRow, setReposicaoProdRow] = React.useState<
    IReposicaoProdAPI[]
  >([]);
  const [reposicaoFornec, setReposicaoFornec] = React.useState<
    IReposicaoFornecAPI[]
  >([]);
  const [posicao, setPosicao] = React.useState<IPosicaoAPI[]>([]);

  React.useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    api.get("/relatorio/extratomovimenta").then((res) => {
      setExtratoRow(res.data);
    });

    api.get("/relatorio/ponto-reposicao-produto").then((res) => {
      setReposicaoProdRow(res.data);
    });

    api.get("/relatorio/ponto-reposicao-fornecedor").then((res) => {
      setReposicaoFornec(res.data);
    });

    api.get("/relatorio/posicao-estoque-deposito").then((res) => {
      setPosicao(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="table-view">
        <div>
          <h2>Extrato de Movimentação do Estoque</h2>
          <Table size="small">
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
              {extratoRow.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.data}</TableCell>
                  <TableCell>{row.nota_FISCAL}</TableCell>
                  <TableCell>{row.entrada_SAIDA}</TableCell>
                  <TableCell>{row.valor}</TableCell>
                  <TableCell>{row.produto}</TableCell>
                  <TableCell>{row.quantidade}</TableCell>
                  <TableCell>{row.fornecedor}</TableCell>
                  <TableCell>{row.deposito}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="table-view">
        <div>
          <h2>Produtos em ponto de Reposição</h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Deposito</TableCell>
                <TableCell>Quantidade Estoque</TableCell>
                <TableCell>Quanatidade Reposição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reposicaoProdRow.map((row) => (
                <TableRow key={row.id_REP}>
                  <TableCell>{row.nom_PROD}</TableCell>
                  <TableCell>{row.nom_DEPOS}</TableCell>
                  <TableCell>{row.num_QTD_ESTOQUE}</TableCell>
                  <TableCell>{row.num_QTD_REPOS}</TableCell>
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Deposito</TableCell>
                <TableCell>Nome Fornecedor</TableCell>
                <TableCell>Quantidade Reposição</TableCell>
                <TableCell>Custo Unitário de Produto</TableCell>
                <TableCell>Data do Cadastro</TableCell>
                <TableCell>Nome Produto</TableCell>
                <TableCell>Quantidade Estoque</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reposicaoFornec.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nom_DEPOS}</TableCell>
                  <TableCell>{row.nom_FORNEC}</TableCell>
                  <TableCell>{row.num_QTD_REPOS}</TableCell>
                  <TableCell>{row.num_CUSTO_UN_PROD}</TableCell>
                  <TableCell>{String(row.dte.getDate() + "/" + row.dte.getMonth() + "/" + row.dte.getFullYear() )}</TableCell>
                  <TableCell>{row.nom_PROD}</TableCell>
                  <TableCell>{row.num_QTD_ESTOQUE}</TableCell>
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
              {posicao.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.produto}</TableCell>
                  <TableCell>{row.saldo}</TableCell>
                  <TableCell>{row.deposito}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}
