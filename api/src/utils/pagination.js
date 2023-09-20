async function paginate(customQueryFunction, page, limit, filterOptions = {}) {
  console.log("resulta da pagina2: " + page);
  limit = 10;
  // Calcula o offset
  const offset = (page - 1) * limit;

  // Adiciona a cláusula WHERE se estiver presente nas opções
  const queryOptions = { limit, offset };
  if (filterOptions.where) {
    queryOptions.where = filterOptions.where;
  }

  // Execute a consulta personalizada e obtenha os dados
  const data = await customQueryFunction(queryOptions);

  // Execute uma segunda consulta para obter o total de registros
  const count = await customQueryFunction({}).length;

  // Calcula o total de páginas
  const pages = Math.ceil(count / limit);
  console.log('PAGINA, PAGINAÇÃO: ' + pages);

  // Retorna os dados, o total de registros e o total de páginas
  return { data, count, pages };
}

module.exports = paginate;
