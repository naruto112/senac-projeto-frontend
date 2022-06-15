import * as React from "react";

import Form from "../../components/Form";
import "./styles.css";

const Fornecedor = () => {
    return (
        <div className="container">
            <div className="fornecedor-form">
                <Form
                    titulo_fomulario="Adicionar Fornecedor"
                    campo={[
                        {
                            key: "fornecedor",
                            id_campo: "nome_fornecedor",
                            nome_campo: "nome_fornecedor",
                            rotulo_campo: "Nome do Fornecedor",
                            sm: 6,
                            xs: 12
                        }
                    ]}
                    handleSubmit={() => {}}                    
                />
            </div>
        </div>
    )
}

export default Fornecedor