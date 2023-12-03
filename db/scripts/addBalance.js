import chalk from "chalk";
import importedSqlite3 from "sqlite3";
import { dbPath } from "../../constants/dbPath.js";

const sqlite3 = importedSqlite3.verbose();

function addBalance(accountName, amount) {
    amount = +amount
    
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if(err) throw new Error(err)
        })

        db.get("SELECT balance FROM accounts WHERE name = ?", accountName, (err, row) => {
            if(err) throw new Error(err)

            const balance = +row.balance;

            const query = "UPDATE accounts SET balance = ? where name = ?"
            db.run(query, [balance + amount, accountName], (err) => {
                if(err) throw new Error(err)

                db.close((err) => {
                    if(err) throw new Error(err);
        
                    console.log(chalk.bgGreen.black(`Deposited ${amount} on account ${accountName}`))
                    resolve()
                })
            })
        })
    })
}

export { addBalance }