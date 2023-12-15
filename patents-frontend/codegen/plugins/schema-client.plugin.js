const fs = require('fs');
const { join } = require('path');

const schemaClientGqlPath = join(process.cwd(), 'src', 'api', 'schema-client.gql');

/**
 * Файл используется как плагин для генерации кода при фетчинге схемы бэкенда.
 * Плагин дополняет полученную схему бэкенда схемой клиента (src/api/schema-client.gql).
 */
module.exports = {
  plugin(schema, documents, config, info) {},
  addToSchema: fs.readFileSync(schemaClientGqlPath, 'utf8').toString()
}
