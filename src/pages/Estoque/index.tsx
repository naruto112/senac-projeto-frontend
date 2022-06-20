import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import "./styles.css";
import api from "../../services/api";

interface IProdutos {
  id: Number;
  nom_PROD: String;
}

interface IFornecedor {
  id: Number;
  nom_FORNEC: String;
}

interface IDeposito {
  id: Number;
  nom_DEPOS: String;
}

const Estoque = () => {
  const [produto, setProduto] = React.useState("");
  const [produtoItem, setProdutoItem] = React.useState<IProdutos[]>([]);
  const [fornecedor, setFornecedor] = React.useState("");
  const [fornecedorItem, setFornecedorItem] = React.useState<IFornecedor[]>([]);
  const [deposito, setDeposito] = React.useState("");
  const [depositoItem, setDepositoItem] = React.useState<IDeposito[]>([]);
  const [nota, setNota] = React.useState(false);
  const [entrada, setEntrada] = React.useState(false);
  const [quantidade, setQuantidade] = React.useState<Number>();
  const [quantidadeRepos, setQuantidadeRepos] = React.useState<Number>();
  const [price, setPrice] = React.useState("");

  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "@token"
  )}`;

  React.useEffect(() => {
    api.get("produtos").then((p) => {
      setProdutoItem(p.data);
    });

    api.get("fornecedores").then((f) => {
      setFornecedorItem(f.data);
    });

    api.get("depositos").then((d) => {
      setDepositoItem(d.data);
    });
  }, []);

  const handleProdutoChange = (event: SelectChangeEvent) => {
    setProduto(event.target.value as string);
  };

  const handleDepositoChange = (event: SelectChangeEvent) => {
    setDeposito(event.target.value as string);
  };

  const handleFornecedorChange = (event: SelectChangeEvent) => {
    setFornecedor(event.target.value as string);
  };

  const handleChangeEntrada = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntrada(event.target.checked);
  };

  const handleChangeNota = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNota(event.target.checked);
  };

  const handleMovimentStock = () => {
    const data = {
      idProduto: produto,
      idDeposito: deposito,
      idFornecedor: fornecedor,
      hasNota: nota,
      hasEntrada: entrada,
      quantity: quantidade,
      quantityReposition: quantidadeRepos,
      price: Number(price.replace(",", ".")),
    };

    api.post("estoque", data).then((res) => {
      if (res.status === 204) {
        setProduto("");
        setProdutoItem([]);
        setFornecedor("");
        setFornecedorItem([]);
        setDeposito("");
        setDepositoItem([]);
        setNota(false);
        setEntrada(false);
        setQuantidade(0);
        setQuantidadeRepos(0);
        setPrice("");
        alert("Estoque movimentado com sucesso !");
      }
    });
  };

  return (
    <div className="container">
      <div className="estoque-form">
        <Typography style={{ marginBottom: 20 }} variant="h6" gutterBottom>
          Movimentar Estoque
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Produtos</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={produto}
              label="Produtos"
              onChange={handleProdutoChange}
            >
              {produtoItem.map((e) => (
                <MenuItem key={Number(e.id)} value={Number(e.id)}>
                  {e.nom_PROD}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Depositos</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deposito}
              label="Depositos"
              onChange={handleDepositoChange}
            >
              {depositoItem.map((e) => (
                <MenuItem key={Number(e.id)} value={Number(e.id)}>
                  {e.nom_DEPOS}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Fornecedores</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fornecedor}
              label="Fornecedores"
              onChange={handleFornecedorChange}
            >
              {fornecedorItem.map((e) => (
                <MenuItem key={Number(e.id)} value={Number(e.id)}>
                  {e.nom_FORNEC}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <TextField
              id="outlined-basic"
              label="Quantidade"
              variant="outlined"
              type="number"
              value={quantidade}
              onChange={(event) => {
                setQuantidade(Number(event.target.value));
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <TextField
              id="outlined-basic"
              label="Quantidade Reposição"
              variant="outlined"
              type="number"
              value={quantidadeRepos}
              onChange={(event) => {
                setQuantidadeRepos(Number(event.target.value));
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <TextField
              id="outlined-basic"
              label="Preço"
              variant="outlined"
              value={price}
              placeholder="R$"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              type="text"
            />
          </FormControl>
        </Box>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={handleChangeNota} checked={nota} />}
              label="Nota?"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleChangeEntrada} checked={entrada} />
              }
              label="Entrada?"
            />
          </FormGroup>
        </FormControl>
        <Grid sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              className="btn-mobile"
              variant="outlined"
              onClick={handleMovimentStock}
              sx={{ mt: 1, ml: 0 }}
              style={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Movimentar
            </Button>
          </Box>
        </Grid>
      </div>
    </div>
  );
};

export default Estoque;
