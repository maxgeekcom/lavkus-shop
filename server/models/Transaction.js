const config = require('config')
const cn = config.get("postgresUri")
const pgp = require('pg-promise')()
const db = pgp(cn)


class Transaction {
  constructor() {}

  static createTransaction(userID, itemsList) {
    const transactionTime = Date.now()
    itemsList.map((item) => {
      db.query(
        `INSERT INTO
        transaction (
          time,
          user_id,
          product_id,
          product_number
        )
      VALUES (
        (to_timestamp(${transactionTime} / 1000.0)),
        '${userID}',
        '${item.id}',
        '${item.number}'
      )`)
    })
  }
}

module.exports = Transaction
