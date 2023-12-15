
// // const { wait } = require('@testing-library/user-event/dist/utils');
// // const mongo_URL = process.env.MONGO_URL

const mongoose = require('mongoose');

// const mongo_URL ="mongodb://127.0.0.1:27017/GofoodMERN"


//  const mongo_URL=`mongodb+srv://FoodApp:${encodeURIComponent('Piyush28')}@cluster0.mr7poce.mongodb.net/FoodApp`



const db = mongoose.connection;

const mongoDB = async (err, result) => {
    await mongoose.connect(process.env.MONGO_URL);
  
    if (err) {
        console.log(err);

    } else {
        console.log("connected database");
        const data = await db.collection("food_items").find({}).toArray();

        const CatData = await db.collection("food_ategory").find({}).toArray();

        if (err) {
            console.error(err);
        } else {
            global.food_items = data;
            global.foodCategory = CatData;

            console.log(global.foodCategory)
        }


    }
}


module.exports = mongoDB;
