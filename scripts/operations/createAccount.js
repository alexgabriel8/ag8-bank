import inquirer from "inquirer"
import chalk from "chalk";

import { accountExists } from "../../db/scripts/accountExists.js";
import { chooseOperation } from "../chooseOperation.js";
import { addAccount } from "../../db/scripts/addAccount.js";

function createAccount() {
    inquirer.prompt([{
        name: "accountName",
        message: "Name of account to create: "
    }])
    .then(answer => {
        const { accountName } = answer;
        
        accountExists(accountName).then(exists => {
            if(exists) {
                console.log(chalk.bgRed.black(`Account "${accountName} already exists`))
                
                inquirer.prompt([{
                    name: "tryAgain",
                    message: "Type another name?",
                    type: "confirm"
                }])
                .then(answer => {
                    const { tryAgain } = answer;
    
                    if(tryAgain) return createAccount()
                    else return chooseOperation()
                })
    
            } else {
                addAccount(accountName)
                return chooseOperation()
            }

        })
    })
}

export { createAccount }