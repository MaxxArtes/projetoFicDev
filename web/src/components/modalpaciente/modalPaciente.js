import React, { useState } from 'react';
import styles from './styles.module.css';

export function ModalCadastrarPaciente({ mostrarModal, onClose, onCadastrarPaciente }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cns, setCns] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');

    const handleCadastrar = () => {
        // Valide os campos e envie os dados do paciente para o servidor, se necessário
        const novoPaciente = {
            nome,
            email,
            telefone,
            celular,
            dataNascimento,
            cns,
            cpf,
            sexo,
        };

        // Chame a função de callback para cadastrar o paciente
        onCadastrarPaciente(novoPaciente);

        // Limpe os campos e feche o modal
        setNome('');
        setEmail('');
        setTelefone('');
        setCelular('');
        setDataNascimento('');
        setCns('');
        setCpf('');
        setSexo('');
        onClose();
    };

    return (
        <div className={`${styles.modal} ${mostrarModal ? styles.show : styles.hide}`}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Cadastrar Paciente</h2>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Telefone:</label>
                <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <label>Celular:</label>
                <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
                <label>Data de Nascimento:</label>
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                <label>CNS:</label>
                <input type="text" value={cns} onChange={(e) => setCns(e.target.value)} />
                <label>CPF:</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                <label>Sexo:</label>
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
                <button className={styles.button} onClick={handleCadastrar}>Cadastrar</button>
            </div>
        </div>
    );
}
