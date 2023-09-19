import React, { useState } from 'react';
import styles from './styles.module.css'; // Certifique-se de importar o seu arquivo de estilos

export function RegisterAgendamento() {
    const [nomeMedico, setNomeMedico] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [cpfPaciente, setCpfPaciente] = useState('');
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horarioAgendamento, setHorarioAgendamento] = useState('');

    const handleRegistrarAgendamento = async () => {
        // Coloque aqui a lógica para enviar os dados do agendamento para o servidor
        // Isso pode envolver uma chamada de API
        // Certifique-se de validar e tratar erros, se aplicável

        try {
            // Exemplo de chamada de API fictícia (substitua por sua própria lógica)
            const response = await fetch('/api/registrarAgendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeMedico,
                    especialidade,
                    cpfPaciente,
                    dataAgendamento,
                    horarioAgendamento,
                }),
            });

            if (response.ok) {
                // Agendamento registrado com sucesso, você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
                console.log('Agendamento registrado com sucesso');
            } else {
                // Lógica de tratamento de erro aqui
                console.error('Erro ao registrar agendamento');
            }
        } catch (error) {
            console.error('Erro ao registrar agendamento', error);
        }
    };

    return (
        <div className={styles.registerAgendamento}> {/* Aplicando a classe de estilo */}
            <h1>Registrar Agendamento</h1>
            <label>Nome do Médico:</label>
            <input type="text" value={nomeMedico} onChange={(e) => setNomeMedico(e.target.value)} />
            <input type="text" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
            <input type="text" value={cpfPaciente} onChange={(e) => setCpfPaciente(e.target.value)} />
            <input type="date" value={dataAgendamento} onChange={(e) => setDataAgendamento(e.target.value)} />
            <input type="time" value={horarioAgendamento} onChange={(e) => setHorarioAgendamento(e.target.value)} />
            <button className={styles.button} onClick={handleRegistrarAgendamento}>Registrar Agendamento</button>
        </div>
    );
}
