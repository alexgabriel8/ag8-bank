import inquirer from "inquirer"
import chalk from "chalk";

import { accountExists } from "../../db/scripts/accountExists.js";
import { removeBalance } from "../../db/scripts/removeBalance.js";
import { chooseOperation } from "../chooseOperation.js";
import { getBalance } from "../../db/scripts/getBalance.js";

function withdraw() {
    inquirer.prompt({
        name: "accountName",
        message: "Account name:"
    })
    .then(answer => {
        const { accountName } = answer;
        accountExists(accountName).then(exists => {

            if(exists) {
                inquirer.prompt({
                    name: "amount",
                    message: "Amount to withdraw:"
                })
                .then(answer => {
                    const { amount } = answer;

                    getBalance(accountName).then(balance => {
                        console.log('b', balance, amount)
                        if(amount > balance || amount <= 0) {
                            console.log(chalk.bgRed.black(`Amount "${amount}" is not valid or balance is insufficient`))

                            inquirer.prompt({
                                name: "tryAgain",
                                message: "Type another amount?",
                                type: "confirm"
                            })
                            .then(answer => {
                                const { tryAgain } = answer;
                
                                if(tryAgain) return withdraw()
                                else return chooseOperation()
                            })
                        } else removeBalance(accountName, amount).then(() => chooseOperation())
                    })
                })
            } else {
                console.log(chalk.bgRed.black(`Account "${accountName}" does not exist`))

                inquirer.prompt({
                    name: "tryAgain",
                    message: "Type another name?",
                    type: "confirm"
                })
                .then(answer => {
                    const { tryAgain } = answer;
    
                    if(tryAgain) return withdraw()
                    else return chooseOperation()
                })

            }
        })
    })

}

export { withdraw }