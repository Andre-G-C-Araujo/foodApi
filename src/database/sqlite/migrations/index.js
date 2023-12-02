const sqliteConnection = require("..");

const createClients = require("./createClients");

async function migrationRun() {
  const schemes = [createClients].join("");

  sqliteConnection()
    .then((db) => db.exec(schemes))
    .catch((error) => console.error(error));
}

module.exports = migrationRun;
