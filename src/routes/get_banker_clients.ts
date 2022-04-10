import express from "express"
import { Banker } from "../entities/Banker";
const router = express.Router()

router.get('/api/bankerclients/:bankerId', async (req, res) => {
  const { bankerId } = req.params;


  const banker = Banker.findOneBy( {id: parseInt(bankerId)})
  console.log(banker)


  return res.json({
    clients: banker
  })
});

export {
  router as getBankerClients
}
