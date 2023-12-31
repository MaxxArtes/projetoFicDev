import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';





export default function ModalSavePacientes(props) {
    console.log(props);
    const [open, setOpen] = useState(false)
    const { handleSubmit } = useForm()
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [cel, setCel] = React.useState('');
    const [CNS, setCNS] = React.useState('');
    const [CPF, setCPF] = React.useState('');
    const [sexo, setSexo] = React.useState('');
    const [dataNasc, setDataNasc] = React.useState('');
    const [endereco, setEndereco] = React.useState('');
    const [id, setId] = React.useState('');





    async function registrarPaciente(props) {
        try {

            const fetchPacientes = async () => {
                try {
                    console.log("PagePacientes: ", props.page.pagePacientes);
                    const response = await api.get(`/listarPacientes/${props.page.pagePacientes}`);
                    const pacientesData = response.data.data;
                    props.setPacientes.setPacientes(pacientesData); // Atualize o estado usando setPacientes
                    props.setPacientes.setPacientes(pacientesData); // Atualize o estado usando setPacientes

                    const calculatedTotalPages = Math.ceil(response.data.count / 10);
                    props.setTotalPagesPacientes.setTotalPagesPacientes(calculatedTotalPages); // Atualize o estado usando setTotalPagesPacientes
                } catch (error) {
                    console.error('Erro ao buscar pacientes', error);
                }
            };

            // configurando as informacoes que vao ser enviadas
            const pacientesData = {
                nome: nome ? props.dados.nome : nome,
                email: email ? props.dados.email : email,
                tel: tel ? props.dados.tel : tel,
                cel: cel ? props.dados.cel : cel,
                CNS: CNS ? props.dados.CNS : CNS,
                CPF: CPF ? props.dados.CPF : CPF,
                sexo: sexo ? props.dados.sexo : sexo,
                data_nasc: dataNasc ? props.dados.data_nasc : dataNasc,
                endereco: endereco ? props.dados.endereco : endereco
            };

            const accessToken = sessionStorage.getItem("token");
            console.log('123', id)

            //fazendo a requisição
            const response = await api.put(`/editarPacientes/${id}`, pacientesData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },

            })

            //Aguardando o retorno
            if (response) {
                alert(`paciente registrado com sucesso`)
                fetchPacientes()
                setOpen(false)
                return
            }

            alert("Erro ao registrar pacientes")

        } catch (error) {

            alert("Informações ausentes")

        }



    }

    return (
        <>

            <div onClick={() => {
                setId(props.dados.id_paciente)
                setOpen(true)
            }}><img alt="Editar" src="edit.png" /></div>

            {

                open &&

                <div className={styles.modal}>
                    <form onSubmit={handleSubmit(registrarPaciente)} className={styles.adicionar}>
                        <div className={styles.contmodal}>
                            <h4 style={{ color: 'black' }}>editar Paciente</h4>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    defaultValue={props.dados.nome}
                                    placeholder="Digite o nome do paciente"
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <input
                                    type="text"
                                    defaultValue={props.dados.email}
                                    placeholder="Digite o e-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <input
                                type="text"
                                defaultValue={props.dados.tel}
                                placeholder="Digite o telefone"
                                onChange={(e) => setTel(e.target.value)}
                            />
                            <input
                                type="text"
                                defaultValue={props.dados.cel}
                                placeholder="Digite o celular"
                                onChange={(e) => setCel(e.target.value)}
                            />
                            <input
                                type="text"
                                defaultValue={props.dados.CNS}
                                placeholder="Digite o CNS"
                                onChange={(e) => setCNS(e.target.value)}
                            />
                            <input
                                type="text"
                                defaultValue={props.dados.CPF}
                                placeholder="Digite o CPF"
                                onChange={(e) => setCPF(e.target.value)}
                            />
                            <select
                                onChange={(e) => {
                                    setSexo(e.target.value);

                                }}
                            >
                                <option value="">Selecione o sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                            <input
                                defaultValue={props.dados.data_nasc}
                                type="date"
                                onChange={(e) => setDataNasc(e.target.value)}
                            />
                            <input
                                type="text"
                                defaultValue={props.dados.endereco}
                                placeholder="Digite o endereço"
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </div>
                        <div className={styles.botao}>
                            <button type='submit' >
                                Adicionar
                            </button>
                            <p style={{ cursor: "pointer", color: 'black' }} onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}
