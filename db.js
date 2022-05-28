const { MongoClient, GridFSBucket } = require('mongodb')
const { Readable } = require('stream');

const url = "mongodb+srv://Me:XHD1QCGaBf7i6LLl@cluster0.rutxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
let userValuesCollection;
let bucket;

async function init() {
    try {
        await client.connect();
        userValuesCollection = client.db("project2").collection("user_values");
        bucket = new GridFSBucket(client.db("project2"), { bucketName: 'photo_bucket' });
    } catch (e){
        console.error(e);
    } 
}

async function getUserPhotos(email) {
    try {
        const cursor = bucket.find({"metadata.email": email});
        let info = {}

        let result = await new Promise( (resolve, reject) => {
            cursor.forEach(doc => {
                bucket.openDownloadStreamByName("project2stack@gmail.com-photo0").on('data', chunk => {
                    info.type = doc.metadata.mimetype;
                    info.buffer = chunk;
                    resolve(info);
                    console.log(info)
                })
            })


        })
        
        
    

        return result;

        // problem with pressing save multiple times

        // bucket.openDownloadStreamByName('myFile').
        // pipe(fs.createWriteStream('./outputFile'));
    } catch (e) {
        console.error(e);
    }
}


async function deleteUserPhotos(email) {
    const cursor = bucket.find({"metadata.email": email});
    await cursor.forEach(doc => {
        bucket.delete(doc._id);
    });
}

async function insertUserPhotos(email, photos) {
    photos.forEach((photo, index) => {
        const stream = Readable.from(photo.buffer);

        console.log(photo.buffer);

        stream.pipe(bucket.openUploadStream(`${email}-photo${index}`, {
            chunkSizeBytes: 1048576,
            metadata: { email: email, mimetype: photo.mimetype }
        }));
    });
}

async function upsertUserPhotos(email, photos) {
    try {
        await deleteUserPhotos(email);
        await insertUserPhotos(email, photos);
    } catch (e) {
        console.error(e);
    }
}

async function upsertUserSettings(email, settings) {
    try {
        console.log(settings);
        const result = await userValuesCollection.updateOne(
            {email: email},
            {$set: {name: settings.name, gender: settings.gender, preferences: settings.preferences}}, 
            {upsert: true}
        );
        console.log(`upsertUserSettings: ${result.matchedCount} document(s) matched the query criteria`);
    } catch (e) {
        console.error(e);
    }
}

async function getUserSettings(email) {
    try {
        const result = await userValuesCollection.findOne({email: email});
        return result;
    } catch (e) {
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
        console.log(`upsertUserAnswers: ${result.matchedCount} document(s) matched the query criteria`);
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

// async function insertBots() {
//     for (let i = 0; i < 10000; i++) {
//       let bot = {
//         email: `bot${i}@gmail.com`, 
//         answers: Array.from({length: 15}, () => Math.floor(Math.random() * 7))
//       }
//       await upsertUserAnswers(bot);
//     }
// }

exports.init = init;
exports.upsertUserAnswers = upsertUserAnswers;
exports.getExactSimilarUsers = getExactSimilarUsers;
exports.upsertUserPhotos = upsertUserPhotos;
exports.upsertUserSettings = upsertUserSettings;
exports.getUserSettings = getUserSettings;
exports.getUserPhotos = getUserPhotos;