import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { api } from '../services/api';

const ChartComponent = () => {
  const [totalMedicos, setTotalMedicos] = useState(0);
  const [totalAtendentes, setTotalAtendentes] = useState(0);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.get('/totalUsuarios');
        setTotalAtendentes(result.data.totalAtendentes.count);
        setTotalMedicos(result.data.totalMedicos.count);
      } catch (error) {
        console.error('Erro ao buscar total de usuários', error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await api.get('/dashStatus');
        console.log("result data:", result.data);
        setStatus(result.data);

      } catch (error) {
        console.error('Erro ao buscar total de usuários', error);
      }
    };

    fetchUsers();
  }, []);

  const totalmed = parseInt(totalMedicos);
  const totalat = parseInt(totalAtendentes);
  const andamento = parseInt(status[0]?.total);
  const finalizado = parseInt(status[1]?.total);
  return (
    <div style={{height: 400, width: '100%', display: 'flex', flexDirection: 'column' }} >
      <div style={{  display: "flex", marginBottom: "25px", justifyContent: "end", width: "100%" }}>
        <h1 style={{ padding: "30px", backgroundColor: "white", borderRadius: "5px ",textAlign: "center" }}>Total de<br /> Atendentes: {totalat}</h1>
        <h1 style={{margin: "0 80px", padding: "30px", backgroundColor: "white", borderRadius: "5px ",textAlign: "center" }}>Total de<br /> Médicos: {totalmed}</h1>
        <h1 style={{ padding: "30px", backgroundColor: "white", borderRadius: "5px ",textAlign: "center" }}>total de <br />agendamentos: {andamento+finalizado}</h1>
      </div>
      <Chart
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Tipo de Usuário', 'Total'],
          ['Médicos', totalmed],
          ['Atendentes', totalat],
        ]}
        options={{
          title: 'Distribuição de Usuários',
          'width': 1000,
          'height': 320,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['status', 'Total'],
          ['andamento', andamento],
          ['finalizado', finalizado],
        ]}
        options={{
          title: 'Status de Consultas',
          'width': 1000,
          'height': 320,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ChartComponent;
