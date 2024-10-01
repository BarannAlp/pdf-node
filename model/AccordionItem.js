const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  pdf: String,
});

const nestedSchema = new mongoose.Schema({
  title: String,
  items: [itemSchema],
});

const accordionItemSchema = new mongoose.Schema({
  title: String,
  nested: [nestedSchema],
  items: [itemSchema],
});

module.exports = mongoose.model("AccordionItems", accordionItemSchema);

