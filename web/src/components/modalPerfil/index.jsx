import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import styles from './modalEditar.module.css';
import { api } from '../../services/api';


export default function ModalPerfil() {
    const [open, setOpen] = useState(false)
    const { handleSubmit } = useForm()
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [reSenha, setReSenha] = React.useState('');
    const [users, setUsers] = React.useState([]);


        const fetchUsers = async () => {
            try {
                const accessToken = sessionStorage.getItem("token");
                const response = await api.get(`perfil/${accessToken}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário', error);
            }
        }





    async function editarPerfil(params) {

        // configurando as informacoes que vao ser enviadas
        const AgendamentoData = {
            nome: nome ? nome : users.nome,
            password: senha ? senha : users.password,
            rePassword: reSenha ? reSenha : users.password,
            email: email ? email : users.email
        };

        const accessToken = sessionStorage.getItem("token");
        console.log('55555', nome, senha, reSenha, email, users.id_usuario)

        //fazendo a requisição
        const response = await api.put(`/editarUsuario/${users.id_usuario}`, AgendamentoData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        })

        //Aguardando o retorno
        if (response) {
            setOpen(false)
            return
        }

        alert("Erro ao Editar Agendamento")

    }

    return (
        <>
            
            <div onClick={() => {
                fetchUsers();
                setOpen(true)
                console.log('55555', nome, senha, reSenha, email, users.id_usuario)
            }}><img alt="perfil" src="perfil.png" /></div>

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
                                    onChange={e => setSenha(e.target.value)}
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
                            <p onClick={() => setOpen(false)}>cancelar</p>
                        </div>
                    </form>
                </div>

            }

        </>
    )
}


