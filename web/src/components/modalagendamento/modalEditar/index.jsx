import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../../services/api';


export default function ModalEditar(props) {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const [medicoSelecionado, setMedicoSelecionado] = React.useState('');
    const [medicos, setMedicos] = React.useState([]);




    async function buscarMedicos() {
        try {
            const response = await api.get('/buscarMedicos'); // Faz a solicitação GET para a rota
            const medicoData = response.data[0];
            setMedicos(medicoData);
            if (!medicoData) {
                throw new Error('Não foi possível buscar os médicos.');
            }
            console.log("MEDICOS", medicoData);
        } catch (error) {
            console.error('Erro ao buscar médicos:', error);
        }

    }

    async function adicionarAgendamento(data) {
        try {
            // configurando as informacoes que vao ser enviadas
            const AgendamentoData = {
                nome: data.nome_paciente,
                nome_medico: medicoSelecionado,
                especialidade: data.especialidade,
                data: data.data,
                horario: data.horario,
            };

            const accessToken = sessionStorage.getItem("token");
            console.log('1')

            //fazendo a requisição
            const response = await api.put(`/editarAgendamento/${props.dados.id_agendamento}`, AgendamentoData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },

            })

            //Aguardando o retorno
            if (response) {
                alert(`Agendamento do id ${props.dados.nome_paciente} editado com sucesso`)
                props.fetchAgendamentos()
                setOpen(false)
                return
            }

            alert("Erro ao Editar Agendamento")
        }

        catch (error) {
            alert("Informações ausentes")
        }

    }


    return (
        <>

            <button onClick={() => {
                setOpen(true)
                buscarMedicos()
            }}><img alt="Editar" src="edit.png" /></button>

            {

                open &&

                <div className={styles.modal}>
                    <form onSubmit={handleSubmit(adicionarAgendamento)} className={styles.adicionar}>
                        <div className={styles.contmodal}>
                            <h4>Adicionar Agendamento</h4>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    placeholder="Digite o nome do paciente"
                                    defaultValue={props.dados.nome_paciente}
                                    {...register('nome_paciente')}
                                />
                                <select
                                    id="medicoSelect"
                                    value={medicoSelecionado}
                                    onChange={(e) => setMedicoSelecionado(e.target.value)}
                                >
                                    <option value="">Selecione um médico</option>
                                    {medicos.map((medico, index) => (
                                        <option key={index} value={medico.nome}>
                                            {medico.nome}
                                        </option>
                                    ))}
                                </select>
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
                            <p style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}
