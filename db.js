const { MongoClient } = require('mongodb')

const url = "mongodb+srv://Me:XHD1QCGaBf7i6LLl@cluster0.rutxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

// async function init() {
//     try {
//         await client.connect();
//     } catch (e){
//         console.error(e);
//     } 
// }

async function insertUserValues(values) {
    try {
        await client.connect();
        const result = await client.db("project2").collection("user_values").insertOne({values});
        console.log(`${result.insertedId} inserted ${values} into the database`);
    } catch (e){
        console.error(e);
    } finally {
        await client.close();
    }
}




exports.insertUserValues = insertUserValues;
