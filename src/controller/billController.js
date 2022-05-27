/* eslint-disable camelcase */
const { getBillByGroupIdDb, addBillToDb } = require('../model/billModel');

async function getBillByGroupId(req, res) {
  const { group_id } = req.params;
  const id = req.userId;
  console.log('group_id===', group_id);
  console.log('id===', id);

  try {
    const billArrayByGroupId = await getBillByGroupIdDb(group_id);
    res.json(billArrayByGroupId);
  } catch (error) {
    console.log('billArrayByGroupId===', error);
    res.sendStatus(500);
  }
}

async function addNewBill(req, res) {
  const { group_id } = req.query;
  const { amount, description } = req.body;

  try {
    const Result = await addBillToDb(group_id, amount, description);
    if (Result.affectedRows === 1) {
      res.sendStatus(201).json('Bill successfully added!');
      return;
    }
    res.status(400).json('Bill not added!');
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = {
  getBillByGroupId,
  addBillToDb,
  addNewBill,
};
