import React, { useState } from 'react';
import styles from './styles.module.css';

export function ModalAgendamento({ mostrarModal, onClose }) {
    // Defina os estados para os campos do agendamento
    const [nomeMedico, setNomeMedico] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [cpfPaciente, setCpfPaciente] = useState('');
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horarioAgendamento, setHorarioAgendamento] = useState('');

    // Função para lidar com o envio do agendamento
    const handleAgendar = () => {

        onClose();
    };

    return (
        <div className={`${styles.modal} ${mostrarModal ? styles.show : styles.hide}`}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Criar Agendamento</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="nomeMedico">Nome do Médico:</label>
                    <input
                        type="text"
                        id="nomeMedico"
                        value={nomeMedico}
                        onChange={(e) => setNomeMedico(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="especialidade">Especialidade:</label>
                    <input
                        type="text"
                        id="especialidade"
                        value={especialidade}
                        onChange={(e) => setEspecialidade(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cpfPaciente">CPF do Paciente:</label>
                    <input
                        type="text"
                        id="cpfPaciente"
                        value={cpfPaciente}
                        onChange={(e) => setCpfPaciente(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dataAgendamento">Data do Agendamento:</label>
                    <input
                        type="date"
                        id="dataAgendamento"
                        value={dataAgendamento}
                        onChange={(e) => setDataAgendamento(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="horarioAgendamento">Horário do Agendamento:</label>
                    <input
                        type="time"
                        id="horarioAgendamento"
                        value={horarioAgendamento}
                        onChange={(e) => setHorarioAgendamento(e.target.value)}
                    />
                </div>
                <button className={styles.primaryButton} onClick={handleAgendar}>Agendar</button>
            </div>
        </div>
    );
}
