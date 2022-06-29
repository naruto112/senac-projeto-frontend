import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./styles.css";
import api from "../../services/api";

interface IFornecedor {
  id: number;
  nom_FORNEC: string;
}

const Fornecedor = () => {
  const [fornecedor, setFornecedor] = React.useState("");
  const [busca, setBusca] = React.useState(true);
  const [data, setData] = React.useState<IFornecedor[]>([]);
  const [atualiza, setAtualiza] = React.useState(false);

  const handleSubmitFornecedor = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    await api
      .post("fornecedores", {
        nom_FORNEC: data.get("nome_fornecedor"),
      })
      .then((res) => {
        if (res.status) {
          alert("Cadastrado com sucesso !");
        }
      });
  };

  const handleSearch = async () => {
    if (fornecedor === "") {
      alert("Preencher o campo Nome do Fornecedor");
      return false;
    }

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const fornecedores: any[] = await (await api.get("fornecedores")).data;

    const result: any = fornecedores.filter((p) => {
      return p.nom_FORNEC.includes(fornecedor);
    });

    if (result.length > 1) {
      alert("Coloque mais palavras para filtrar a pesquisa");
      return false;
    }

    setFornecedor(result[0].nom_FORNEC);
    setData(result);
    setBusca(false);
    setAtualiza(true);
    alert("Fornecedor encontrado");
  };

  const handleUpdate = async () => {
    data[0].nom_FORNEC = fornecedor;

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const status = await (await api.put("fornecedores", data[0])).status;

    if (status === 202) {
      alert("alterado com sucesso!");
      setData([]);
      setFornecedor("");
      setAtualiza(false);
      setBusca(true);
    }
  };

  return (
    <div className="container">
      <div className="fornecedor-form">
        <Box component="form" onSubmit={handleSubmitFornecedor}>
          <Typography style={{ marginBottom: 50 }} variant="h6" gutterBottom>
            Adicionar Fornecedores
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nome_fornecedor"
              name="nome_fornecedor"
              label="Nome Fornecedor"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
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
              <Button
                variant="outlined"
                onClick={() => {}}
                sx={{ mt: 3, ml: 1 }}
                type="submit"
              >
                Cadastrar
              </Button>
            </Box>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Fornecedor;
