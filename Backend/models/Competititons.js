const mongoose  = require('mongoose');
const otheruserschema = require('./otheruser');
const commentsmodel = require('./Comments');


const FaqSchema = new mongoose.Schema({
    question : {
        type : String,
    },

    answer :{
        type : String,
    },
});

const ResultSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    name : {
        type : String,
    },

    score : {
        type : Number,
    },

    time : {
        type :Date,
    },
})


const CompetitionsSchema = new mongoose.Schema({
    hosts : {
        type : [otheruserschema],
    },
    
    starttime : {
        type :Date,
        required: true
    },

    endtime : {
        type :Date,
    },

    noofparticipants :{
        type : Number,
    },

    participants : {
        type : [ResultSchema],
    },

    faqs :{
        type:[FaqSchema],
    },

    comments : {
        type : [commentsmodel],
    },

    top10 : {
        type : [ResultSchema], 
    },

});


module.exports = mongoose.model("Competitions" , CompetitionsSchema);