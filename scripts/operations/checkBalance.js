import chalk from "chalk"
import inquirer from "inquirer"
import importedSqlite3 from "sqlite3"

import { accountExists } from "../../db/scripts/accountExists.js"
import { getBalance } from "../../db/scripts/getBalance.js"
import { chooseOperation } from "../chooseOperation.js"

const sqlite3 = importedSqlite3.verbose()


function checkBalance() {
    inquirer.prompt([{
        name: "accountName",
        message: "Account name: "
    }])
    .then(answer => {
        const { accountName } = answer;

        accountExists(accountName)
        .then(exists => {
            if(!exists) {
                console.log(chalk.bgRed.black(`Account ${accountName} does not exist`))

                inquirer.prompt([{
                    name: "tryAgain",
                    message: "Type another name?",
                    type: "confirm"
                }])
                .then(answer => {
                    const { tryAgain } = answer;
    
                    if(tryAgain) return checkBalance()
                    else return chooseOperation()
                })
            } else {
                getBalance(accountName).then(() => chooseOperation())
            }
        })
    })
}

export { checkBalance }