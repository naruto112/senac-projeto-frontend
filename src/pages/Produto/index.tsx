import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "./styles.css";
import api from '../../services/api';

const Products = () => {

    const handleSubmitProduto = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("@token")}`;

        await api.post("produtos", {
            "nom_PROD": data.get("nome_produto")
        }).then(res => {
            if(res.status) {
                alert("Cadastrado com sucesso !");
            }
        })

    }

    return (
        <div className="container">
            <div className="product-form">
                <Box component="form" onSubmit={handleSubmitProduto}>
                    <Typography style={{marginBottom: 50}} variant="h6" gutterBottom>
                        Adicionar Produtos
                    </Typography>
                    <Grid item xs={12} sm={6} >
                        <TextField
                        required
                        id="nome_produto"
                        name="nome_produto"
                        label="Nome Produto"
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

export default Products