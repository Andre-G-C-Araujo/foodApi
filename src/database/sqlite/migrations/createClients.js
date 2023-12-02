const createClients = `
CREATE TABLE IF NOT EXISTS clients  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR, 
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

module.exports = createClients;

/* SQL CODE


INSET 
READ 
UPDATE
DELETE

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR, 
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,     
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,







  ALTER == alterar

  ALTER TABLE clients          // isso faz com que adicione uma coluna na tabela de clients em bd 
  ADD status VARCHAR

  ALTER TABLE clients 
  RENAME COLUMN status TO active


  ALTER TABLE clients 
  DROP COLUMN status // deleta coluna
  
)*/
