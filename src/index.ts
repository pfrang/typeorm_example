require('dotenv').config();

import { createConnection } from "typeorm"
import express from "express";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from './entities/Transaction'
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { getBankerClients } from "./routes/get_banker_clients";

const app = express()

const main = async () => {
  try {
    const conneciton = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [Client, Banker, Transaction],
      synchronize: true
    })
    console.log('Connected to Postgres');
    app.use(express.json())
    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(createTransactionRouter)
    app.use(connectBankerToClientRouter)
    app.use(getBankerClients)

    app.listen(8080, () => {
      console.log("Now running on port 8080")
    })
  } catch(error) {
    console.error (error)
    throw new Error("Unable to connect to db")
  }
}

main()
