import chalk from "chalk"
import path from "path"
import importedSqlite3 from "sqlite3";

import { dbPath } from "../../constants/dbPath.js";

const sqlite3 = importedSqlite3.verbose()

function createDb() {
    return new Promise((resolve) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if(err) throw new Error(err)
            
            db.run("CREATE table accounts (name TEXT, balance NUMBER)")
            console.log(chalk.green(`Database "${path.parse(dbPath).base}" created.`))

        });
        
        db.close((err) => {
            if (err) throw new Error(err);

            resolve()
        });
        
        // db.serialize(() => {
        //     const stmt = db.prepare(`INSERT INTO accounts(name, balance) VALUES (?, ?)`);

        //         stmt.run("Aldex", 0);

        //     stmt.finalize();

        //     db.each(`SELECT *
        //              FROM accounts`, (err, row) => {
        //       if (err) {
        //         console.error(err.message);
        //       }
        //       console.log(row)
        //       console.log(row.id + "\t" + row.name);
        //     });
        //   });
    })
}
export { createDb }