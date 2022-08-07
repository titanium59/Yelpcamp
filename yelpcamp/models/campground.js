const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const CampGroundSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description : String,
    location: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampGroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.remove({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground' , CampGroundSchema)