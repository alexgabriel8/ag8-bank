import chalk from "chalk";
import inquirer from "inquirer";
import { accountExists } from "../../db/scripts/accountExists.js";
import { addBalance } from "../../db/scripts/addBalance.js";
import { chooseOperation } from "../chooseOperation.js";


function deposit() {
    inquirer.prompt({
        name: "accountName",
        message: "Account name: "
    })
    .then(answer => {
        const { accountName } = answer;

        accountExists(accountName).then(exists => {
            if(exists) {
                inquirer.prompt({
                    name: "amount",
                    message: "Amount to deposit: "
                })
                .then(answer => {
                    const { amount } = answer;

                    if(amount <= 0) {
                        console.log(chalk.bgRed.black(`Amount "${amount}" is not valid`))

                        inquirer.prompt({
                            name: "tryAgain",
                            message: "Type another amount?",
                            type: "confirm"
                        })
                        .then(answer => {
                            const { tryAgain } = answer;
            
                            if(tryAgain) return deposit()
                            else return chooseOperation()
                        })
                    } else addBalance(accountName, amount).then(() => chooseOperation())
                })
            } else {
                console.log(chalk.bgRed.black(`Account "${accountName}" does not exist`))
                
                inquirer.prompt([{
                    name: "tryAgain",
                    message: "Type another name?",
                    type: "confirm"
                }])
                .then(answer => {
                    const { tryAgain } = answer;
    
                    if(tryAgain) return deposit()
                    else return chooseOperation()
                })
            }
        })
    })
}

export { deposit }