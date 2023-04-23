const express = require('express');
const router = express.Router();
const user = require('../models/user');

// GET all

router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one

router.get('/:id', getUser, async (req, res) => {
    res.send(req.Person);
});

// CREATE one

router.post('/', async (req, res) => {
    const newUser = new user({
        userName: req.body.userName,
        userRank: req.body.userRank,
        userScore: req.body.userScore
    })

    try {
        const Person = await newUser.save();
        res.status(201).json(Person);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE one

router.patch('/:id', getUser, async (req, res) => {
    if (req.body.userName != null) {
        res.Person.userName = req.body.userName;
    }
    if (req.body.userRank != null) {
        res.Person.userRank = req.body.userRank;
    }
    if (req.body.userScore != null) {
        res.Person.userScore = req.body.userScore;
    }

    try {
        const updatedUser = await res.Person.save();
        res.json(updatedUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE one

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.Person.remove();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next)
{
    try {
        Person = await user.findById(req.params.id);
        if (Person == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
    res.Person = Person;
    next();
}

module.exports = router;