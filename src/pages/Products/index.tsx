import * as React from 'react';

import Form from "../../components/Form";
import "./styles.css";

const Products = () => {


    return (
        <div className="container">
            <div className="product-form">
                <Form 
                    titulo_fomulario='Adicionar Produtos'
                    campo={[
                        {   
                            key: "produto",
                            id_campo: "nome_produto",
                            nome_campo: "nome_produto",
                            rotulo_campo: "Nome do produto",
                            sm: 6,
                            xs: 12
                        },
                    ]}
                    handleSubmit={() => {}}
                />
            </div>
        </div>
    )
}

export default Products