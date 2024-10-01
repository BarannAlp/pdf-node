const AccordionItem = require('../model/AccordionItem'); // Import the AccordionItems model
const asyncHandler = require("express-async-handler");

const accordionItemsCtrl = {
// CREATE Accordion Item
createAccordionItem: asyncHandler(async (req, res) => {
  try {
    const { title, nested, items } = req.body;

    const accordionItem = new AccordionItem({
      title,
      nested,
      items
    });

    await accordionItem.save(); // Save new accordion item to the database
    res.status(201).json(accordionItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating accordion item', error });
  }
}),

// EDIT Accordion Item
editAccordionItem: asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, nested, items } = req.body;

    const updatedAccordionItem = await AccordionItem.findByIdAndUpdate(
      id,
      { title, nested, items },
      { new: true } // Return the updated document
    );

    if (!updatedAccordionItem) {
      return res.status(404).json({ message: 'Accordion item not found' });
    }

    res.json(updatedAccordionItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating accordion item', error });
  }
}),

// DELETE Accordion Item
deleteAccordionItem: asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAccordionItem = await AccordionItem.findByIdAndDelete(id);

    if (!deletedAccordionItem) {
      return res.status(404).json({ message: 'Accordion item not found' });
    }

    res.json({ message: 'Accordion item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting accordion item', error });
  }
})
};

module.exports = accordionItemsCtrl;