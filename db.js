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

async function getUserInfo(email) {
    try {
        const result = await userValuesCollection.findOne({email: email});
        return result;
    } catch (e) {
        console.error(e);
    }
}

async function upsertUserSettings(email, settings) {
    try {
        const result = await userValuesCollection.updateOne(
            {email: email},
            {$set: settings}, 
            {upsert: true}
        );
        console.log(`upsertUserSettings: ${result.matchedCount} document(s) matched the query criteria`);
    } catch (e) {
        console.error(e);
    }
}

async function getUserAnswers(email) {
    try {
        const result = await userValuesCollection.findOne(
            {email: email},
            { projection: { _id: 0, answers: 1 } }
        );

        if (result === null || Object.keys(result).length === 0) {
            return {answers: []};
        } else {
            return result;
        }
    } catch (e) {
        console.error(e);
    }
}

async function upsertUserAnswers(email, newAnswers) {
    try {
        const result = await userValuesCollection.updateOne(
            {email: email},
            {$set: {answers: newAnswers}}, 
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

exports.init = init;
exports.upsertUserAnswers = upsertUserAnswers;
exports.getExactSimilarUsers = getExactSimilarUsers;
exports.upsertUserSettings = upsertUserSettings;
exports.getUserInfo = getUserInfo;
exports.getUserAnswers = getUserAnswers;

// async function insertBots() {
//     for (let i = 0; i < 10000; i++) {
//       let bot = {
//         email: `bot${i}@gmail.com`, 
//         answers: Array.from({length: 15}, () => Math.floor(Math.random() * 7))
//       }
//       await upsertUserAnswers(bot);
//     }
// }

// function getPhotoName(email, index) {
//     return `${email}-photo${index}`;
// }

// async function downloadPhotoToBuffer(doc) {
//     return new Promise((resolve, reject) => {
//         let bucketStream = bucket.openDownloadStream(doc._id);
//         let bufs = [];

//         bucketStream.on('data', chunk => {
//             bufs.push(chunk);
//         });

//         bucketStream.on('end', () => {
//             resolve({type: doc.metadata.mimetype, buffer: Buffer.concat(bufs)});
//         });

//         bucketStream.on('error', () => {
//             reject("Error: GridFS openDownloadStream failed.");
//         });
//     });
// }

// async function getPhotoBuffer(doc) {
//     return await downloadPhotoToBuffer(doc);;
// }

// async function getUserPhoto(email, index) {
//     try {
//         const fileName = getPhotoName(email, index);
//         const doc = await bucket.find({"filename": fileName}).toArray();

//         if (doc.length === 0) {
//             return;
//         }
        
//         return getPhotoBuffer(doc[0]);
//     } catch (e) {
//         console.error(e);
//     }
// }

// async function deleteOldUserPhotos(photos) {
//     photos.forEach(photo => {
//         const cursor = bucket.find({filename: photo.originalname});
//         cursor.forEach(doc => {
//             bucket.delete(doc._id);
//         })
//     })
// }

// async function insertUserPhotos(email, photos) {
//     photos.forEach((photo) => {
//         const stream = Readable.from(photo.buffer);

//         stream.pipe(bucket.openUploadStream(`${photo.originalname}`, {
//             chunkSizeBytes: 1048576,
//             metadata: { email: email, mimetype: photo.mimetype }
//         }));
//     });
// }

// async function upsertUserPhotos(email, photos) {
//     try {
//         await deleteOldUserPhotos(photos);
//         await insertUserPhotos(email, photos);
//     } catch (e) {
//         console.error(e);
//     }
// }


