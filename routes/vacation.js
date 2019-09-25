const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Vacation = require('../models/Vacation');

router.get('/', auth, async (req, res) => {
    try {
        const vacation = await Vacation.find({ user: req.user.id }).sort({ date: -1 });
        res.json(vacation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post( '/', [ auth, [
        check('dateStart', 'dateStart is required').not().isEmpty(),
        check('dateEnd', 'dateEnd is required').not().isEmpty(),
        check('days', 'days is required').not().isEmpty()
    ] ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { dateStart, dateEnd, days, description } = req.body;

        try {
            const newVacation = new Vacation({
                dateStart,
                dateEnd,
                days,
                description,
                user: req.user.id
            });

            const vacation = await newVacation.save();

            res.json(vacation);
        } catch (err) {
            console.error(er.message);
            res.status(500).send('Server Error');
        }
    }
);

router.put('/:id', auth, async (req, res) => {
    const { dateStart, dateEnd, days, description } = req.body;
    const vacationFields = {};
    if (dateStart) vacationFields.dateStart = dateStart;
    if (dateEnd) vacationFields.dateEnd = dateEnd;
    if (days) vacationFields.days = days;
    if (description) vacationFields.description = description;

    try {
        let vacation = await Vacation.findById(req.params.id);

        if (!vacation) return res.status(404).json({ msg: 'Vacation not found' });

        if (vacation.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        vacation = await Vacation.findByIdAndUpdate(
            req.params.id,
            { $set: vacationFields },
            { new: true }
        );

        res.json(vacation);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let vacation = await Vacation.findById(req.params.id);

        if (!vacation) return res.status(404).json({ msg: 'Vacation not found' });

        if (vacation.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Vacation.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Vacation removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
