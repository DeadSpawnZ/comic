const titleCtrl = {};

const Comic = require('../models/Comic');
const Title = require('../models/Title');
const UserComic = require('../models/UserComic');

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
    const titles = await Title.aggregate([
        { $match: { titlename: new RegExp( '.*' + comicName + '.*', 'i') } },
        { $lookup: 
            { from: "comics", 
            let: { idTitle: "$_id" },
            as: "cover",
                pipeline:[ 
                    { $match: 
                        { $expr:
                            { $and:
                               [
                                 { $eq: [ "$title",  "$$idTitle" ] },
                                 { $eq: [ "$no", "1" ] }
                               ]
                            }
                        }
                    },
                    { $project: { "cover": 1 } }
                ]
            },
        }
    ]);
    res.json({ titles: titles });
};
module.exports = titleCtrl;