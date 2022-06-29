import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./styles.css";
import api from "../../services/api";

interface IDeposito {
  nom_DEPOS: string;
  id: number;
}

const Depositos = () => {
  const [deposito, setDeposito] = React.useState("");
  const [busca, setBusca] = React.useState(true);
  const [data, setData] = React.useState<IDeposito[]>([]);
  const [atualiza, setAtualiza] = React.useState(false);

  const handleSubmitDeposito = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    await api
      .post("depositos", {
        nom_DEPOS: data.get("nome_deposito"),
      })
      .then((res) => {
        if (res.status) {
          alert("Cadastrado com sucesso !");
        }
      });
  };

  const handleSearch = async () => {
    if (deposito === "") {
      alert("Preencher o campo Nome Produto");
      return false;
    }

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const depositos: any[] = await (await api.get("depositos")).data;

    const result: any = depositos.filter((p) => {
      return p.nom_DEPOS.includes(deposito);
    });

    if (result.length > 1) {
      alert("Coloque mais palavras para filtrar a pesquisa");
      return false;
    }

    setDeposito(result[0].nom_DEPOS);
    setData(result);
    setBusca(false);
    setAtualiza(true);
    alert("Deposito encontrado");
  };

  const handleUpdate = async () => {
    data[0].nom_DEPOS = deposito;

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("@token")}`;

    const status = await (await api.put("depositos", data[0])).status;

    if (status === 202) {
      alert("alterado com sucesso!");
      setData([]);
      setDeposito("");
      setAtualiza(false);
      setBusca(true);
    }
  };

  return (
    <div className="container">
      <div className="deposito-form">
        <Box component="form" onSubmit={handleSubmitDeposito}>
          <Typography style={{ marginBottom: 50 }} variant="h6" gutterBottom>
            Adicionar Depósitos
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nome_deposito"
              name="nome_deposito"
              label="Nome Depósito"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={deposito}
              onChange={(e) => setDeposito(e.target.value)}
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

export default Depositos;
