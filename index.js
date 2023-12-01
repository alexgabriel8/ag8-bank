import chalk from "chalk";
import fs from "fs";

import { chooseOperation } from "./scripts/chooseOperation.js";
import { createDb } from "./db/scripts/createDb.js";

import { dbPath } from "./constants/dbPath.js";

if(!fs.existsSync(dbPath)) {
    console.log(chalk.bgYellow.black("Database not found. Creating..."))
    await createDb()

    chooseOperation()
} else chooseOperation()
