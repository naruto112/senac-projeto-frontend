import * as React from "react";
import moment from "moment";
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
  data: Date;
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
          <h2>Extrato de Movimenta????o do Estoque</h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Data</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Nota Fiscal
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Entrada/Sa??da
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Produto</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Quantidade</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Fornecedor</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Dep??sito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extratoRow.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {String(moment(row.data).format("DD/MM/YYYY"))}
                  </TableCell>
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
          <h2>Produtos em ponto de Reposi????o</h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Produto</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Dep??sito</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Quantidade Estoque
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Quanatidade Reposi????o
                </TableCell>
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
            Produtos em ponto de reposi????o x Fornecedores para cota????o de compra
          </h2>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Dep??sito</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Nome Fornecedor
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Quantidade Reposi????o
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Custo Unit??rio de Produto
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Data do Cadastro
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Nome Produto
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Quantidade Estoque
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reposicaoFornec.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nom_DEPOS}</TableCell>
                  <TableCell>{row.nom_FORNEC}</TableCell>
                  <TableCell>{row.num_QTD_REPOS}</TableCell>
                  <TableCell>{row.num_CUSTO_UN_PROD}</TableCell>
                  <TableCell>
                    {String(moment(row.dte).format("DD/MM/YYYY"))}
                  </TableCell>
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
          <h2>Posi????o Atual de Estoque Geral e por Dep??sito</h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Produto</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Saldo</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Dep??sito</TableCell>
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
