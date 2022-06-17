import * as React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "./styles.css";
import api from "../../services/api";

const Fornecedor = () => {

    const handleSubmitFornecedor = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("@token")}`;

        await api.post("depositos", {
            "nom_DEPOS": data.get("nome_deposito")
        }).then(res => {
            if(res.status) {
                alert("Cadastrado com sucesso !");
            }
        })
    }

    return (
        <div className="container">
            <div className="fornecedor-form">
                <Box component="form" onSubmit={handleSubmitFornecedor}>
                    <Typography style={{marginBottom: 50}} variant="h6" gutterBottom>
                        Adicionar Fornecedores
                    </Typography>
                    <Grid item xs={12} sm={6} >
                        <TextField
                        required
                        id="nome_fornecedor"
                        name="nome_fornecedor"
                        label="Nome Fornecedor"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        />
                    </Grid>
                    <Grid sx={{ width: "100%"}}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    )
}

export default Fornecedor