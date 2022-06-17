import * as React from "react";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import "./styles.css";

const Estoque = () => {
    const [produto, setProduto] = React.useState('');
    const [deposito, setDeposito] = React.useState('');
    const [fornecedor, setFornecedor] = React.useState('');
    const [price, setPrice] = React.useState('');

    const handleProdutoChange = (event: SelectChangeEvent) => {
        setProduto(event.target.value as string);
    };

    const handleDepositoChange = (event: SelectChangeEvent) => {
        setDeposito(event.target.value as string);
    };

    const handleFornecedorChange = (event: SelectChangeEvent) => {
        setFornecedor(event.target.value as string);
    };
    

    return (
        <div className="container">
            <div className="estoque-form">
                <Typography style={{marginBottom: 20}} variant="h6" gutterBottom>
                    Movimentar Estoque
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={produto}
                        label="Age"
                        onChange={handleProdutoChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={deposito}
                        label="Age"
                        onChange={handleDepositoChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fornecedor}
                        label="Age"
                        onChange={handleFornecedorChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Nota?" />
                            <FormControlLabel control={<Checkbox />} label="Entrada?" />
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box>
                <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <TextField id="outlined-basic" label="Quantidade" variant="outlined" type="number" />
                    </FormControl>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <TextField id="outlined-basic" label="Quantidade Reposição" variant="outlined" type="number" />
                    </FormControl>
                    <FormControl sx={{ m: 1,  minWidth: 245 }}>
                        <TextField id="outlined-basic" label="Preço" variant="outlined"
                            value={price}
                            placeholder="R$"
                            onChange={event => {
                               setPrice(event.target.value);
                            }} type="text" 
                        />
                    </FormControl>
                </Box>
                <Grid sx={{ width: "100%"}}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        className="btn-mobile"
                        variant="outlined"
                        onClick={() => {}}
                        sx={{ mt: 3, ml: 1 }}
                        >
                        Movimentar
                    </Button>
                </Box>  
                </Grid>
            </div>
        </div>
    )
}

export default Estoque;