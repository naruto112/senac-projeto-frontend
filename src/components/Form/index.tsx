import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Campo {
    key: String;
    nome_campo: string;
    rotulo_campo: string;
    id_campo: string;
    xs: Number;
    sm: Number;
}

interface Form {
    titulo_fomulario: string;
    campo: [Campo, Campo?, Campo?, Campo?, Campo?, Campo?, Campo?];
    handleSubmit: (event: Event) => void;
}

export default function Form({titulo_fomulario, campo, handleSubmit}: Form) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {titulo_fomulario}
      </Typography>
      <Grid container spacing={3}>
        {campo.map(c => {
            let key = 0;
            key++;

            return (
                <Grid item xs={12} sm={6} key={key} >
                    <TextField
                    key={key}
                    required
                    id={c?.id_campo}
                    name={c?.nome_campo}
                    label={c?.rotulo_campo}
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    />
                </Grid>
            )
        })}
        
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
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
    </React.Fragment>
  );
}