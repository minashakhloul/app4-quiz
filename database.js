/**
 * Created by mina on 18/05/15.
 */
//lets require/import the mongodb native drivers.
//var mongodb = require('mongodb');


function Prop(s, value) {
    this.s = s; //String
    this.value = value;  //0 ->false or 1 -> correct
}

function Question(title, prop) {
    this.q = title;
    this.prop = prop; //array of answers
    this.nbAnswers = 0;
    for (var i = 0; i < prop.length; ++i) {
        if (prop[i].value)
            this.nbAnswers++;
    }
}

function Quiz(title) {
    this.title = title;
    this.questions = [];
}

function Database(mongoClient, url) {
    this.mongoClient = mongoClient;
    this.url = url;
}

Database.prototype.connect = function (mongoClient, url) {
    mongoClient.connect(url, (function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            throw new Error;
        } else {
            console.log('Connection established to', url);
            this.connection = db;
            this.afterConnect();
        }
    }).bind(this));
}

Database.prototype.insertQuiz = function (quiz, collectionString) {
    var collection = this.connection.collection(collectionString);
    collection.insertOne(quiz, (function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted document into the "quizList" collection.');
        }
    }).bind(this));
}

Database.prototype.selectQuiz = function (mongodb, idQuiz, collectionString) {
    var collection = this.connection.collection(collectionString);
    var id = mongodb.ObjectId(idQuiz);
    collection.findOne({_id: id}, (function (err, document) {
        if (err) {
            console.log("Error while retrieving quiz with id :" + idQuiz);
            throw new Error;
        } else {
            if (document != null) {
                console.log("Retrieved quiz");
                this.quiz = document;
                console.log(JSON.stringify(this.quiz));
            }
        }
    }).bind(this));
}

Database.prototype.selectAllQuizes = function (collectionString) {
    var collection = this.connection.collection(collectionString);
    collection.find({}).toArray((function (err, documents) {
        if (err) {
            console.log("Error while retrieving all quizes: " + err);
            throw new Error;
        } else {
            console.log("Retrieved all quizes");
            this.quizes = documents;
            console.log(JSON.stringify(this.quizes));
        }
    }).bind(this));
}

Database.prototype.selectAllQuizesIds = function (collectionString) {
    var collection = this.connection.collection(collectionString);
    collection.find({}, {_id_: true}).toArray((function (err, ids) {
        if (err) {
            console.log("Error while retrieving all quizes ids");
            throw new Error;
        } else {
            console.log("Retrieved all quizes ids");
            this.quizesIds = ids;
            console.log(JSON.stringify(this.quizesIds));
        }
    }).bind(this));
}

exports.Database = Database;
exports.Question = Question;
exports.Prop = Prop;