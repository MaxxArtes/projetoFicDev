const { Sequelize, QueryTypes } = require('sequelize');

async function paginate(model, page, limit, filterOptions = {}) {
  limit = 10;
  const offset = (page - 1) * limit;

  // Construa a cláusula WHERE com base nas opções de filtro
  const whereClause = filterOptions.where || '';

  // Construa a consulta SQL
  const query = `
    SELECT 
      agendamento.*,
      paciente.id_paciente,
      paciente.nome as nome_paciente
    FROM
      agendamentos AS agendamento
    LEFT JOIN
      pacientes AS paciente
    ON
      agendamento.id_paciente = paciente.id_paciente
    WHERE
      1=1 ${whereClause}
    LIMIT
      ${limit}
    OFFSET
      ${offset}
  `;

  // Execute a consulta SQL
  const data = await model.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  console.log('DATA PAGIANÇÃO: ',data);

  // Execute a consulta SQL para contar o total de registros
  const countQuery = `
    SELECT 
      COUNT(*) AS count
    FROM
      agendamentos AS agendamento
    LEFT JOIN
      pacientes AS paciente
    ON
      agendamento.id_paciente = paciente.id_paciente
    WHERE
      1=1 ${whereClause}
  `;

  const countResult = await model.sequelize.query(countQuery, {
    type: QueryTypes.SELECT,
  });

  const count = countResult[0].count;

  const pages = Math.ceil(count / limit);

  return { data, count, pages };
}

module.exports = paginate;
