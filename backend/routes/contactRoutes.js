const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

//GET all contacts
router.get('/', async (req, res) =>{
    try{
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error){
        res.status(500).json({ error: error.message});
    }
});

//GET a specific contact by ID
router.get('/:id', async (req, res) =>{
    try{

        const contact = await Contact.findByPk(req.params.id);
        if (contact) res.json(contact);
        else res.status(404).json({ message: 'Contact not found'});

    }catch(error) {
        res.status(500).json
    }
});

//POST a new contact
router.post('/', async (req, res) => {
    try {
      const newContact = new Contact(req.body); // Make sure Contact is your model
      await newContact.save();
      res.status(201).json(newContact); // Respond with the created contact
    } catch (err) {
      console.error('Error adding contact:', err); // Log error to console
      res.status(500).json({ message: 'Failed to create contact' }); // Respond with error
    }
  });
  

//PUT update a contact by ID
router.put('/:id', async (req, res) => {
    try{
        const { name, phone, email, address } = req.body;
        const contact = await Contact.findByPk(req.params.id);
        if (contact) {
            await contact.update({ name, phone, email, address });
            res.json(contact);
        } else{
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch(error) {
        res.status(500).json({ error: error.message});
    }
});

//DELETE a contact by ID
router.delete('/:id', async (req, res) =>{
    try{
        const contact = await Contact.findByPk(req.params.id);
        if(contact){
            await contact.destroy();
            res.json({ message: 'Contact not found' });
        }
    } catch (error){
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;