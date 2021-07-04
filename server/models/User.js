const config = require('config')
const cn = config.get("postgresUri")
const pgp = require('pg-promise')()
const db = pgp(cn)

class User {
  constructor(lastName, firstName, login, password, userPic, faceCode) {
    this.lastName = lastName
    this.firstName = firstName
    this.login = login
    this.password = password
    this.userPic = userPic
    this.faceCode = faceCode
  }

  create() {
    db.query(
      `INSERT INTO 
        "user" (
          last_name,
          first_name,
          login,
          password,
          balance,
          user_pic,
          face_code
        )
      VALUES (
        '${this.lastName}',
        '${this.firstName}',
        '${this.login}',
        '${this.password}',
        50,
        '${this.userPic}',
        '${this.faceCode}'
      );`
    )
  }

  // Look for all users with certain login.
  static find(login) {
    return db.query(
      `SELECT
        * 
      FROM
        "user"
      WHERE
        login = '${login}';`
    )
  }

  static updatePersonalInfo(userID, lastName, firstName) {
    return db.query(
      `UPDATE 
        "user" 
      SET 
        last_name = '${lastName}',
        first_name = '${firstName}'
      WHERE 
        id = ${userID};`
    )
  }

  static updatePassword(userID, newPassword) {
    return db.query(
      `UPDATE
        "user"
      SET
        password = '${newPassword}'
      WHERE
        id = ${userID};`
    )
  }

  static updateUserPic(userID, userPic) {
    return db.query(
      `UPDATE
        "user"
      SET
        user_pic = '${userPic}'
       WHERE id = ${userID};`
    )
  }

  static updateBalance(userID, newBalance) {
    return db.query(
      `UPDATE
        "user"
      SET
        balance = ${newBalance}
      WHERE 
        id = ${userID};`
    )
  }

  static getUserPic(userID) {
    return db.query(
      `SELECT 
        user_pic 
      FROM
        "user"
      WHERE
        id = ${userID};`
    )
  }

  static getBalance(userID) {
    return db.query(
      `SELECT
        balance
      FROM
        "user"
      WHERE
        id = ${userID};`
    )
  }

  static getProfile(userID) {
    return db.query(
      `SELECT 
        last_name,
        first_name,
        balance
      FROM
        "user"
      WHERE
        id = ${userID};`
    )
  }

  static getPassword(userID) {
    return db.query(
      `SELECT 
        password
      FROM
        "user"
      WHERE
        id = ${userID};`
    )
  }

  static getCandidates() {
    return db.query(
      `SELECT id, last_name, first_name, balance, face_code FROM "user"`
    )
  }
}

module.exports = User
