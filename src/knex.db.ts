import * as Knex from "knex";

export const config = {
    client: 'pg',
    connection: process.env.postgresURL,
    debug: false
}

const instance: Knex = Knex.default(config as Knex.Config);

instance
  .raw('select 1')
  .then(() => {
      // tslint:disable-next-line:no-console
    console.log(`Connected to database - OK`)
  })
  .catch(err => {
      // tslint:disable-next-line:no-console
      console.log(`Failed to connect to database: ${err}`)
    process.exit(1)
  })

export const db = () => instance
