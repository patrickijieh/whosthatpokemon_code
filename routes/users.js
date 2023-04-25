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

// GET one (via id)

router.get('/:userName', getUser, async (req, res) => {
    res.json(res.Person);
});

// GET one (via userName)
/*router.get('', async(req, res) => {

    try {
        const Person = await user.findOne({ userName: req.params.userName });

        if (Person == null) {
            return res.status(500).json({ message: 'Cannot find user' });
        }

        res.json(Person);

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});*/

// CREATE one

router.post('/', async (req, res) => {

    const dbUser = await user.findOne({ userName: req.body.userName });

    if (dbUser != null)
    {
        res.status(400).json({ message: "Username is already taken!" });
        return;
    }

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

router.patch('/:userName', getUser, async (req, res) => {
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

router.delete('/:userName', getUser, async (req, res) => {
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
        const getPerson = await user.findOne({userName: req.params.userName});
        if (getPerson == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }

        res.Person = getPerson;
        next();

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;