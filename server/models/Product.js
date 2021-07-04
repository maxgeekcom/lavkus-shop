const config = require('config')
const cn = config.get("postgresUri")
const pgp = require('pg-promise')()
const db = pgp(cn)


class Product {
  constructor() {
  }

  static getProductInfo(id) {
    return db.query(
      `SELECT
        *
      FROM
        product
      WHERE
        id = '${id}';`
    )
  }
}

module.exports = Product
