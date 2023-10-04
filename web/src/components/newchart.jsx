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
    <div style={{ height: 400, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
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
          'width': 1500,
          'height': 400,
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
          'width': 1500,
          'height': 400,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ChartComponent;
