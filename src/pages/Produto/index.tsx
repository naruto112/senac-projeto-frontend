import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./styles.css";
import api from "../../services/api";

interface IProduto {
  id: number;
  nom_PROD: string;
  num_QTD_ESTOQUE: number;
  num_VLR_ESTOQUE: number;
  num_VLR_MEDIO_UN: number;
}

const Products = () => {
  const [produto, setProduto] = React.useState("");
  const [busca, setBusca] = React.useState(true);
  const [data, setData] = React.useState<IProduto[]>([]);
  const [atualiza, setAtualiza] = React.useState(false);

  const handleSubmitProduto = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    await api
      .post("produtos", {
        nom_PROD: data.get("nome_produto"),
      })
      .then((res) => {
        if (res.status) {
          alert("Cadastrado com sucesso !");
        }
      });
  };

  const handleSearch = async () => {
    if (produto === "") {
      alert("Preencher o campo Nome Produto");

      return false;
    }

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const produtos: any[] = await (await api.get("produtos")).data;

    const result: any = produtos.filter((p) => {
      return p.nom_PROD.includes(produto);
    });

    if (result.length > 1) {
      alert("Coloque mais palavras para filtrar a pesquisa");
      return false;
    }

    setProduto(result[0].nom_PROD);
    setData(result);
    setBusca(false);
    setAtualiza(true);
    alert("Produto encontrado");
  };

  const handleUpdate = async () => {
    data[0].nom_PROD = produto;

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const status = await (await api.put("produtos", data[0])).status;

    if (status === 202) {
      alert("alterado com sucesso!");
      setData([]);
      setProduto("");
      setAtualiza(false);
      setBusca(true);
    }
  };

  return (
    <div className="container">
      <div className="product-form">
        <Box component="form" onSubmit={handleSubmitProduto}>
          <Typography style={{ marginBottom: 50 }} variant="h6" gutterBottom>
            Adicionar Produtos
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nome_produto"
              name="nome_produto"
              label="Nome Produto"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {busca && (
                <Button
                  variant="outlined"
                  onClick={handleSearch}
                  sx={{ mt: 3, ml: 1 }}
                  style={{ color: "#FFA500", borderColor: "#FFA500" }}
                >
                  Buscar
                </Button>
              )}

              {atualiza && (
                <Button
                  variant="outlined"
                  onClick={handleUpdate}
                  sx={{ mt: 3, ml: 1 }}
                  style={{ color: "#FF0000", borderColor: "#FF0000" }}
                >
                  Atualizar
                </Button>
              )}
              <Button variant="outlined" sx={{ mt: 3, ml: 1 }} type="submit">
                Cadastrar
              </Button>
            </Box>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Products;
