 const express = require('express')
 const cors = require('cors')
 const app = express()
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose')
 app.use(cors())
 app.use(express.json())
// app.use(bodyParser.json());  // Middleware to parse JSON requests



const { MongoClient , ObjectId} = require('mongodb');
// Connection URI (replace with  MongoDB connection string)
const uri = "mongodb+srv://suruthi:404538@cluster0.7moq8kp.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.post('/message',(req,res)=>{ 

    n=req.body.name,
  p=req.body.password



console.log(n)
console.log(p)



async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database and collection
    const database = client.db('fstdb'); 
    const collection = database.collection('workers'); 
    // Data to insert
    const dataToInsert = {
      name: n,
      password: p,
      email: 'ghgn.doe@example.com'

    };

    // Insert the data
    const insertResult = await collection.insertOne(dataToInsert);
    
    console.log('Inserted document ID:', insertResult.insertedId);
    console.log("submitted successful");
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    
  }
}
run().catch(console.error);

})


// show data


app.get('/show', async (req, res) => {
  console.log("hi")
  try {
  //  console.error('Error fetching data:', error);
    // Fetch data from MongoDB here
    await client.connect();

        // Select the database and collection
        const database = client.db('fstdb'); 
        const collection = database.collection('workers'); 
    
    const data = await collection.find().toArray();
   
    await client.close();

    console.log(data);
  
    res.json(data);//above

   } catch (error) {
    console.error('Error fetching data:', error);
     res.status(500).json({ error: 'Server error' });
  }
  // await client.close();
});


//del data


app.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  // const msg= itemId.toArray();
  console.log("hi",itemId)
  
  try {
    
    await client.connect(); 
    console.log("ser cntd");
      
        const database = client.db('fstdb'); 
        const collection = database.collection('workers'); 

    const result = await collection.deleteOne({ _id: new ObjectId(itemId)});//n 
    // await client.close();
    // console.log(result);
  
    if (result.deletedCount === 1) {
      console.log(`Document with ID ${itemId} deleted successfully.`);
     res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      console.log(`Document with ID ${itemId} not found.`);
      res.status(404).json({ message: 'Document not found' });
    }
  }
 catch(error) {
  console.error('Error fetching data:', error);
  if (error.message) {
    console.error('MongoDB Error:', error.message);
  }
  res.status(500).json({ error: 'Internal server error' });
}    
finally {
  await client.close();
}
});



app.put('/edit/:id', async (req, res) => {
  const  id  = req.params.id;
  const updatedData = req.body;
  console.log("edit on this id",  id);
  console.log("change to data ", updatedData);

  try {
    await client.connect();
    const db = client.db('fstdb');
    const collection = db.collection('workers');

    
console.log("updatedarray",updatedData.email)
  
//  const result = await collection.updateOne( { _id :new ObjectId(id) },{ $set: {name:updatedData.name }});
 const result = await collection.updateOne({ password :(updatedData.password)},
 {$set:  { name: updatedData.name}});
 

  if (result.matchedCount > 0) {
    console.log('Document updated successfully.');
  } else {
    console.log('doesnt update .');
  }

  client.close();
  res.status(200).send('Data updated successfully');
  }
   
  
  catch(error) {
    console.error('Error fetching data:', error);
    if (error.message) {
      console.error('MongoDB Error:', error.message);
    }
    res.status(500).json({ error: 'Internal server error' });
  }  


});
  


 app.listen(8000, () =>{
  console.log('server is running');
});