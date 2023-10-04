import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';


export default function ModalRegistrarConsulta(props) {
    const [open, setOpen] = useState(false)
    const { handleSubmit } = useForm()
    const [descricao, setDescricao] = React.useState('');
    let [receita, setReceita] = React.useState(false);
    const [historico, setHistorico] = React.useState('');
    const id = props.dados.id_paciente





    async function adicionarAgendamento() {

        // configurando as informacoes que vao ser enviadas
        // Configurando as informações que vão ser enviadas
        const AgendamentoData = {
            id_agendamento: props.dados.id_agendamento,
            id_paciente: id,
            descricao: descricao,
            historico_clinico: historico,
            receita: receita,
        };

        console.log("AGENDAMENTODATA ID PACIENTE:",AgendamentoData.id_paciente)

        const accessToken = sessionStorage.getItem("token");

        //fazendo a requisição
         
        const response = await api.post(`/registrarProntuario/`, AgendamentoData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        })

        //Aguardando o retorno
        if (response) {
            alert(`consulta de ${props.dados.nome_paciente} feita com sucesso`)
            props.fetchAgendamentos()
            setOpen(false)
            return
        }

        alert("Erro ao Editar Agendamento")

    }

    return (
        <>

            <button onClick={() => {
                setOpen(true)
            }}><img alt="Editar" src="Vector.png" /></button>

            {

                open &&

                <div className={styles.modal}>
                    <form onSubmit={handleSubmit(adicionarAgendamento)} className={styles.adicionar}>
                        <div className={styles.contmodal}>
                            <h4>Adicionar Prontuario</h4>
                            <div className={styles.inputcontainer}>
                                <input style={{ width: "60%", border: "1px solid #000 " }}
                                    type="text"
                                    placeholder="Digite o nome do paciente"
                                    defaultValue={props.dados.nome_paciente}
                                    disabled
                                />
                                <input
                                    style={{ width: "35%", border: "1px solid #000 " }}
                                    type="date"
                                />

                            </div>
                            <input style={{ width: "100%", border: "1px solid #000 ", backgroundColor: "#FFF" }}
                                type="text"
                                placeholder="Digite o histórico de doenças"
                                value={historico}
                                onChange={(e) => setHistorico(e.target.value)}

                            />
                            <textarea style={{ width: "100%", height: "600px", border: "1px solid #000 ", backgroundColor: "#FFF" }}
                                type="text"
                                placeholder="Digite a decricao do problema"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}

                            />
                        </div>
                        <div className={styles.botao} >
                            <div>
                            <button onClick={(e) => {e.preventDefault(); setReceita(!receita)}}>
                                <label>receita</label>
                                <div style={{width: "90px", height: "10px", borderRadius:"10px", backgroundColor: receita ? "green" : "red"}}></div>
                            </button>
                           
                                    <button type='submit' >
                                        Finalizar e Salvar
                                    </button>
                            </div>
                            <p style={{ cursor: "pointer" }} onClick={() => {setOpen(false); setReceita(false)}} >cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}
