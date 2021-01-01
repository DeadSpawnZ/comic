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
    const status = req.body.status;
    const user = await User.findOne({ _id: userId });
    //Val if the user already has the comic
    const validation = await UserComic.findOne({ user: userId, comic: comicId });
    console.log('validation', validation);
    if(!validation) {
        const newAdquisition = new UserComic({
            user: userId,
            comic: comicId,
            status: status
        });
        await newAdquisition.save();
    } else {
        if(validation.status == status){
            await UserComic.deleteOne({ user: userId, comic: comicId});
        }else{
            validation.status = status;
            await validation.save();
        }
    }
    const miscomics = await UserComic.find({ user: userId }).select('comic');
    res.json({ miscomics: miscomics });
}

comicCtrl.getAllTitle = async (req, res) => {
    const { id } = req.query;
    const titleId = mongoose.Types.ObjectId(id);
    const title = await Title.findOne( titleId );
    const decoded = jwt.verify(req.token, 'collect');
    const userId = mongoose.Types.ObjectId(decoded.id);
    const comics = await Comic.aggregate([
        { $match: { title: titleId } },
        { $lookup: 
            { from: "usercomics", 
                let: { idComic: "$_id" },
                as: "usercomic",
                pipeline:[ 
                    { $match: 
                        { $expr:
                            { $and:
                               [
                                 { $eq: [ "$comic",  "$$idComic" ] },
                                 { $eq: [ "$user",  userId ] }
                               ]
                            }
                        }
                    },
                    { $project: { "status": 1 } }
                ]
            },
        }
    ]);
    res.json({ comics: comics, title: title });
};

comicCtrl.postComic = async (req, res) => {
    console.log(req.body);
    const decoded = jwt.verify(req.token, 'collect');
    const user = mongoose.Types.ObjectId(decoded.id);
    const path = req.file.filename;
    //path = req.protocol + "://" + req.get('host') + '/' + path;
    const { no, variant, print, type, price, dateP, title } = req.body;
    const newComic = new Comic({
        no: no,
        variant: variant,
        print: print,
        type: type,
        price: price,
        cover: path,
        date: dateP,
        title: title,
        user: user
    });
    await newComic.save();
    res.json({ message: 'salvado por la campanilla' });
};

comicCtrl.searchComic = async (req, res) => {
    const { comicName } = req.body;
    const comics = await Comic.find({ name: new RegExp('.*' + comicName + '.*', 'i') });
    res.json({ list: comics });
};

comicCtrl.getComic = async (req, res) => {
    const { id } = req.query;
    if(id !== '' && id !== null && id !== undefined){
        const comicId = mongoose.Types.ObjectId(id);
        const comic = await Comic.findOne({ _id: comicId })
            .populate({ path: 'title', select: 'titlename editorial' })
            .populate({ path: 'user', select: 'username' });
        const who = await UserComic.aggregate([
            { $match: { comic: comicId }},
            { $group: {
                _id: '$status',
                count: { 
                  $sum: 1
                }
            }}
        ]);
        console.log("WHO", who);
        res.json({ comic: comic });
    }else{
        console.log("XDDDDDDDDDDDDD");
        res.json({});
    }
};

module.exports = comicCtrl;