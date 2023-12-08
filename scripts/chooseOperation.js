import inquirer from "inquirer";
import chalk from "chalk";

import { createAccount } from "./operations/createAccount.js";
import { checkBalance } from "./operations/checkBalance.js";
import { deposit } from "./operations/deposit.js";
import { withdraw } from "./operations/withdraw.js";

function chooseOperation() {
    console.log(chalk.bgBlue.black("Welcome to AG8 Bank!"))

    inquirer.prompt({
        name: "action",
        type: "list",
        choices: [
            "Create Account",
            "Check Balance",
            "Deposit",
            "Withdraw",
            "Transfer",
            "Quit"
        ]
    })
    .then(answer => {
        const { action } = answer;

        switch(action) {
            case "Create Account":
                createAccount();
                break
            case "Check Balance":
                checkBalance();
                break
            case "Deposit":
                deposit();
                break
            case "Withdraw":
                withdraw();
                break
            case "Quit":
                console.log(chalk.bgBlue.black("Thank you for using AG8 Bank!"));
                process.exit();
        }
    })
}

export { chooseOperation }