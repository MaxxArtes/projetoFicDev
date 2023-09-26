import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';

export default function ModalEditar(props) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit } = useForm()


    async function editarAgendamento(data) {

        // configurando as informacoes que vao ser enviadas
        const AgendamentoData = {
            nome: data.nome_paciente,
            nomeMedico: data.nome_medico,
            especialidade: data.especialidade,
            data: data.data,
            horario: data.horario,
        };

        const accessToken = sessionStorage.getItem("token");
        console.log('1')

        //fazendo a requisição
        const response = await fetch('https://lonely-puce-crab.cyclic.app/editarAgendamento/' + props.dados.id_agendamento, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(AgendamentoData)
        })

        //Aguardando o retorno
        if (response.ok) {
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
            }}>Editar</button>

            {

                open &&

                <div className={styles.modal}>
                    <form onSubmit={handleSubmit(editarAgendamento)} className={styles.adicionar}>
                        <div className={styles.contmodal}>
                            <h4>Editar Agendamento</h4>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    placeholder="Digite o nome do paciente"
                                    defaultValue={props.dados.nome_paciente}
                                    {...register('nome_paciente')}
                                    disabled={true}
                                />
                                <select
                                    defaultValue={props.dados.nome_medico}
                                    {...register('nome_medico')}

                                />
                            </div>
                            <input
                                type="date"
                                defaultValue={props.dados.data}
                                {...register('data')}
                            />
                            <input
                                type="text"
                                placeholder="Digite sua especialização"
                                defaultValue={props.dados.especialidade}
                                {...register('especialidade')}

                            />
                            <input
                                type="time"
                                placeholder="Digite a horario da consulta"
                                defaultValue={props.dados.horario}
                                {...register('horario')}
                            />
                        </div>
                        <div className={styles.botao}>
                            <button type='submit' >
                                Adicionar
                            </button>
                            <p onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}
