import importedSqlite3 from "sqlite3"

import { dbPath } from "../../constants/dbPath.js"
import chalk from "chalk"

const sqlite3 = importedSqlite3.verbose()


function getBalance(accountName) {
    return new Promise((resolve) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if(err) throw new Error(err)
        })

        db.get("SELECT name, balance FROM accounts WHERE name = ?", accountName, (err, row) => {
            if(err) throw new Error(err)
            console.log(chalk.green(`${row.name}: ${row.balance}`))
            db.close((err) => {
                if(err) throw new Error(err)

                resolve(row.balance)
            })
        })

    })
}

export { getBalance }