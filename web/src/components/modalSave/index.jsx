import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';


export default function ModalSave(props) {
    console.log(props);
    const [open, setOpen] = useState(false)
    const { register, handleSubmit } = useForm()
    const [medicoSelecionado, setMedicoSelecionado] = React.useState('');
    const [medicos, setMedicos] = React.useState([]);
    const [data, setData] = React.useState('');
    const [especialidade, setEspecialidade] = React.useState('');
    const [hora, setHora] = React.useState('');
    const [unidadeSaude, setUnidadeSaude] = React.useState('');



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





    async function editarAgendamento(params) {

        // configurando as informacoes que vao ser enviadas
        const AgendamentoData = {
            nome_medico: medicoSelecionado,
            especialidade: especialidade,
            data: data,
            horario: hora,
            unidade_saude: unidadeSaude,
            id_paciente: props.dados.id_paciente
        };

        const accessToken = sessionStorage.getItem("token");
        console.log('1')

        //fazendo a requisição
        const response = await api.post(`/registerAgendamento`, AgendamentoData, {
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
                buscarMedicos()
            }}>agendar</button>

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
                                    defaultValue={props.dados.nome}
                                    {...register('nome_paciente')}
                                    disabled={true}
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
                                onChange={(e) => setData(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Digite sua especialização"
                                onChange={(e) => setEspecialidade(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Digite a unidade de saude"
                                onChange={(e) => setUnidadeSaude(e.target.value)}
                            />
                            <input
                                type="time"
                                placeholder="Digite a horario da consulta"
                                onChange={(e) => setHora(e.target.value)}
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


