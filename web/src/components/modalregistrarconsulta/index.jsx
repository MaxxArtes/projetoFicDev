import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';


export default function ModalRegistrarConsulta(props) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const [descricao, setDescricao] = React.useState('');
    let [receita, setReceita] = React.useState(false);
    const [historico, setHistorico] = React.useState('');
    const id = props.dados.id_paciente





    async function adicionarAgendamento() {

        // configurando as informacoes que vao ser enviadas
        // Configurando as informações que vão ser enviadas
        const AgendamentoData = {
            id_paciente: id,
            descricao: descricao,
            historico_clinico: historico,
            receita: receita,
        };

        console.log(AgendamentoData.id_paciente)


        const accessToken = sessionStorage.getItem("token");
        console.log('1')

        //fazendo a requisição
        const response = await api.post(`/registrarProntuario/`, AgendamentoData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        })

        //Aguardando o retorno
        if (response) {
            alert(`Agendamento do id ${props.dados.id_agendamento} editado com sucesso`)
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
                        <div className={styles.botao}>
                            <div>
                            <button>
                                <input type="radio" id="opcao1" name="opcao" value="receita"
                                    onChange={(e) => setReceita(true)}/>
                                <label for="true">receita</label>
                            </button>
                                    <button type='submit' >
                                        Finalizar e Salvar
                                    </button>
                            </div>
                            <p onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}
