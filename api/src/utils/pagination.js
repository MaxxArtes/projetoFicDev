const { Sequelize, QueryTypes } = require('sequelize');

async function paginate(model, page, filterOptions) {
  limit = 9;
  const offset = (page - 1) * limit;
  console.log("FILTER PAGINATION: ", filterOptions);
  // Inicialize a cláusula WHERE
  let whereClause = '1=1';

  // Adicione uma cláusula WHERE para filtrar nomes que começam com "Maria" (se for fornecido)
  if (filterOptions) {
    whereClause += ` AND LOWER(paciente.nome) LIKE LOWER('${filterOptions}%')`;
    console.log("WHERECLAUSE PAGINATION: ",whereClause);
  }

  // Construa a consulta SQL
  const query = `
    SELECT 
      agendamento.*,
      paciente.id_paciente,
      paciente.nome as nome_paciente,
      paciente.data_nasc as data_nasc
    FROM
      agendamentos AS agendamento
    LEFT JOIN
      pacientes AS paciente
    ON
      agendamento.id_paciente = paciente.id_paciente
    WHERE
      ${whereClause}
    ORDER BY data, horario desc
    LIMIT
      ${limit}
    OFFSET
      ${offset}
    
  `;


  // Execute a consulta SQL
  const data = await model.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  console.log('DATA PAGINAÇÃO: ', data);

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
      ${whereClause}
  `;

  const countResult = await model.sequelize.query(countQuery, {
    type: QueryTypes.SELECT,
  });

  const count = countResult[0].count;

  const pages = Math.ceil(count / limit);

  return { data, count, pages };
}

module.exports = paginate;
