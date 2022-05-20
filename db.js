const { MongoClient } = require('mongodb')

const url = "mongodb+srv://Me:XHD1QCGaBf7i6LLl@cluster0.rutxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
let userValuesCollection;

async function insertBots() {
    for (let i = 0; i < 10000; i++) {
      let bot = {
        email: `bot${i}@gmail.com`, 
        answers: Array.from({length: 15}, () => Math.floor(Math.random() * 7))
      }
      await upsertUserAnswers(bot);
    }
}
  
async function init() {
    try {
        await client.connect();
        userValuesCollection = client.db("project2").collection("user_values");
    } catch (e){
        console.error(e);
    } 
}

async function upsertUserAnswers(userInfo) {
    try {
        const result = await userValuesCollection.updateOne(
            {email: userInfo.email},
            {$set: {answers: userInfo.answers}}, 
            {upsert: true}
        );
        console.log(`${result.matchedCount} document(s) matched the query criteria`);
    } catch (e) {
        console.error(e);
    }
}

function isAgree(answer) {
    return answer > 3;
}

function isDisagree(answer) {
    return answer < 3;
}

function getSimilarValuesFilter(answers) {
    let filter = {};

    for (let i = 0; i < answers.length; i++) {
        if (isAgree(answers[i])) {
            filter[`answers.${i}`] = { $gte: 3, $lte: 6 };
        } else if (isDisagree(answers[i])) {
            filter[`answers.${i}`] = { $gte: 0, $lte: 3 };
        } else {
            filter[`answers.${i}`] = { $gte: answers[i] - 1, $lte: answers[i] + 1 };
        }
    }
    return filter;
}

async function getExactSimilarUsers(userEmail) {
    try {
        const currentUser = await userValuesCollection.findOne({email: userEmail});
        const filter = getSimilarValuesFilter(currentUser.answers);
        filter.email = { $ne: userEmail };
        const filteredUsers = await getFilteredUsers(filter);
        return {userAnswers: currentUser.answers, peopleAnswers: filteredUsers};
    } catch (e) {
        console.error(e);
    }
}

async function getFilteredUsers(filter) {
    try {
        const cursor = userValuesCollection.find(filter);
        const result = await cursor.toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}

exports.init = init;
exports.upsertUserAnswers = upsertUserAnswers;
exports.getExactSimilarUsers = getExactSimilarUsers;