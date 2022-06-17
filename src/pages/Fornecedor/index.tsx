import * as React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "./styles.css";

const Fornecedor = () => {
    return (
        <div className="container">
            <div className="fornecedor-form">
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
                            >
                            Cadastrar
                        </Button>
                    </Box>  
                </Grid> 
            </div>
        </div>
    )
}

export default Fornecedor