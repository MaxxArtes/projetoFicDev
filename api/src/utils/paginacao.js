//arquivo pagination.js
//função para paginação
async function paginate(model, page, limit) {
    //calcula o offset
    const offset = (page - 1) * limit;
    //busca os dados com limite e offset
    const data = await model.findAll({ limit, offset });
    //busca o total de registros
    const count = await model.count();
    //calcula o total de páginas
    const pages = Math.ceil(count / limit);
    //retorna os dados, o total de registros e o total de páginas
    return { data, count, pages };
}

//exporta a função
module.exports = paginate;
