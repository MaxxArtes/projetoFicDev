async function paginate(model, page, limit, options = {}) {
    limit = 6;
    // Calcula o offset
    const offset = (page - 1) * limit;
    
    // Adiciona a cláusula WHERE se estiver presente nas opções
    const queryOptions = { limit, offset };
    if (options.where) {
        queryOptions.where = options.where;
    }
    
    // Busca os dados com as opções de consulta
    const data = await model.findAll(queryOptions);
    
    console.log("resulta da pagina: " + page);
    // Busca o total de registros com base nas mesmas opções de consulta
    const count = await model.count(queryOptions);
    
    // Calcula o total de páginas
    const pages = Math.ceil(count / limit);

    // Retorna os dados, o total de registros e o total de páginas
    return { data, count, pages };
}

// Exporta a função

module.exports = paginate;
