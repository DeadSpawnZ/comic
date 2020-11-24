const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const comicCtrl = {};

const Comic = require('../models/Comic');
const Title = require('../models/Title');
const User = require('../models/User');
const UserComic = require('../models/UserComic');

comicCtrl.addComic = async (req, res) => {
    const decoded = jwt.verify(req.token, 'collect');
    const userId = mongoose.Types.ObjectId(decoded.id);
    const comicId = mongoose.Types.ObjectId(req.body.id);
    const user = await User.findOne({ _id: userId });
    //Val if the user already has the comic
    const validation = await UserComic.findOne({ user: userId, comic: comicId });
    console.log('validation', validation);
    if(!validation) {
        const newAdquisition = new UserComic({
            user: userId,
            comic: comicId
        });
        await newAdquisition.save();
        console.log("lel");
    } else {
        await UserComic.deleteOne({ user: userId, comic: comicId});
    }
    const miscomics = await UserComic.find({ user: userId }).select('comic');
    res.json({ miscomics: miscomics });
}

comicCtrl.getAllTitle = async (req, res) => {
    const { id } = req.query;
    const titleId = mongoose.Types.ObjectId(id);
    const comics = await Comic.find({ titleid: titleId });
    const title = await Title.findOne( titleId );
    //const lol = await Comic.find({ no: '1' }).populate('titleid');
    //console.log(lol);
    const decoded = jwt.verify(req.token, 'collect');
    const userId = mongoose.Types.ObjectId(decoded.id);
    const match = await UserComic.find({ user: userId }).populate({ path: 'comic', match: { titleid: titleId }, select: '_id' }).select('comic');
    console.log('match', match);

    res.json({ list: comics, title: title, match: match });
};

comicCtrl.postComic = async (req, res) => {
    console.log(req.body);
    const path = req.file.filename;
    //path = req.protocol + "://" + req.get('host') + '/' + path;
    const { no, variant, print, type, price, titleid } = req.body;
    const newComic = new Comic({
        no: no,
        variant: variant,
        print: print,
        type: type,
        price: price,
        cover: path,
        titleid: titleid
    });
    await newComic.save();
    res.json({ message: 'salvado por la campanilla' });
};

comicCtrl.searchComic = async (req, res) => {
    const { comicName } = req.body;
    const comics = await Comic.find({ name: new RegExp('.*' + comicName + '.*', 'i') });
    res.json({ list: comics });
};

module.exports = comicCtrl;