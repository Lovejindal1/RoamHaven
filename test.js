const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://lkjindal123:LRNT7jABDbRniVd9@cluster0.3vgwfrb.mongodb.net/airbnb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log("✅ SUCCESS: Connected to MongoDB!");
  } catch (err) {
    console.log("❌ ERROR:", err);
  } finally {
    await client.close();
  }
}

run();