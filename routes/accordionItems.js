const express = require("express");
const accordionItemsCtrl = require("../controller/accordionItems");

const router = express.Router();

//!Register
router.post("/api/accordionItems/createAccordionItem", accordionItemsCtrl.createAccordionItem);
router.get("/api/accordionItems/editAccordionItem", accordionItemsCtrl.editAccordionItem);
router.get("/api/accordionItems/deleteAccordionItem", accordionItemsCtrl.deleteAccordionItem);

module.exports = router;
