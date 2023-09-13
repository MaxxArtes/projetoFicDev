const { groupPatientsByGender } = require('./util/patients');

async function main() {
  const rows = await groupPatientsByGender();
  console.log(rows);
}

main();
