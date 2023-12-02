import importedSqlite3 from "sqlite3";;
import chalk from "chalk";

const sqlite3 = importedSqlite3.verbose();

import { dbPath } from "../../constants/dbPath.js"

function addAccount(accountName) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if(err) console.error(err)
        })
    
        db.run("INSERT INTO accounts (name, balance) values (?, ?)", [accountName, 0], (err) => {
            if(err) console.error(err)
        })
    
        db.close((err) => {
            if(err) console.error(err)
            
            resolve(console.log(chalk.bgGreen.black(`Account "${accountName}" created succesfully`)))
        })

    })
}

export { addAccount }