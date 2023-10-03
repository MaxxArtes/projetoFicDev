import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';


export default function ModalPerfil() {
    const [open, setOpen] = useState(false)
    const { handleSubmit } = useForm()
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha1, setSenha1] = React.useState('');
    const [reSenha, setReSenha] = React.useState('');
    const [users, setUsers] = React.useState([]);


    const fetchUsers = async () => {
        try {
            const accessToken = sessionStorage.getItem("token");
            const response = await api.get(`perfil/${accessToken}`);

            console.log("reponse: ", response.data[0][0]);
            setUsers(response.data[0][0]);
        } catch (error) {
            console.error('Erro ao buscar usuário', error);
        }
    }





    async function editarPerfil(params) {
        // configurando as informacoes que vao ser enviadas
        const AgendamentoData = {
            nome: nome ? nome : users.nome,
            password: senha1 ? senha1 : users.password,
            rePassword: reSenha ? reSenha : users.password,
            email: email ? email : users.email
        };

        const accessToken = sessionStorage.getItem("token");

        //fazendo a requisição
        const response = await api.put(`/editarUsuario/${users.id_usuario}`, AgendamentoData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        })

        //Aguardando o retorno
        if (response) {
            setOpen(false)
            window.location.reload()
            return
        }

        alert("Erro ao Editar Agendamento")

    }

    return (
        <>
            <div onClick={() => {

                fetchUsers();
                setOpen(true)
            }}><div className={styles.profilecontainer}>
                    <img className={styles.profileimg} src="perfil.png" alt="Perfil" />
                    <div className={styles.profilecaption}>Perfil</div>
                </div>
            </div>

            {

                open &&

                <div className={styles.modal}>
                    <form onSubmit={handleSubmit(editarPerfil)} className={styles.adicionar}>
                        <div className={styles.contmodal}>
                            <h4>Perfil</h4>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    defaultValue={users.nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'grid' }}>
                                <input type="email"
                                    defaultValue={users.email}
                                    onChange={e => setEmail(e.target.value)} />
                                <input className={styles.input}
                                    type="password"
                                    onChange={e => setSenha1(e.target.value)}
                                />
                                <input className={styles.input}
                                    type="password"
                                    onChange={e => setReSenha(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.botao}>
                            <button type='submit' >
                                Salvar
                            </button>
                            <p style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}


