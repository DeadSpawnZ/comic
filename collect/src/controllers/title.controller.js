const titleCtrl = {};

const Title = require('../models/Title');

titleCtrl.postTitle = async (req, res) => {
    const { titlename, editorial, country } = req.body;
    const newTitle = new Title({
        titlename: titlename,
        editorial: editorial,
        country: country
    });
    await newTitle.save();
    res.json({message: 'New title created'});
};

titleCtrl.searchTitle = async (req, res) => {
    const { comicName } = req.body;
    const titles = await Title.find({ titlename: new RegExp( '.*' + comicName + '.*', 'i') });
    res.json({ list: titles });
};
module.exports = titleCtrl;