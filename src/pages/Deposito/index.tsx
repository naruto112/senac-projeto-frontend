import * as React from "react";

import Form from "../../components/Form";
import "./styles.css";

const Depositos = () => {
    return(
        <div className="container">
            <div className="deposito-form">
                <Form
                
                    titulo_fomulario="Adicionar Depositos"
                    campo={[
                        {
                            key: "deposito",
                            id_campo: "nome_deposito",
                            nome_campo: "nome_deposito",
                            rotulo_campo: "Nome do Deposito",
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

export default Depositos