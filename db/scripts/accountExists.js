import importedSqlite3 from "sqlite3";
import chalk from "chalk";
import { dbPath } from "../../constants/dbPath.js";

const sqlite3 = importedSqlite3.verbose();

function accountExists(accountName) {
    return new Promise((resolve, reject) => {
        if(accountName === '') resolve(false);
        let exists = false;
    
        const db = new sqlite3.Database(dbPath, (err) => {
            if(err) reject(chalk.bgRed.black(err.message))
            // if(err) throw new Error(err)
        })

        db.get("SELECT name FROM accounts WHERE name = ?", accountName, (err, row) => {
            if(err) reject(chalk.bgRed.black(err.message))
            // if(err) throw new Error(err)
            if(row) exists = true;
        })

        db.close((err) => {
            if (err) return console.log(chalk.bgRed.black(err.message));
            // if (err) throw new Error(err)
            resolve(exists)
        });
    })
}

export { accountExists }