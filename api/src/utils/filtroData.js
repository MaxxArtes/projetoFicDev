let dataInicial = new Date('2023-09-01');
let dataFinal = new Date('2023-09-30');

let objetosFiltrados = objetos.filter((objeto) => {
  let dataObjeto = new Date(objeto.data);
  return dataObjeto >= dataInicial && dataObjeto <= dataFinal;
});

console.log(objetosFiltrados);

module.exports = filtrarPorData;
