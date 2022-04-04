var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
const {dburl, mongodb, MongoClient, dbname} = require('../dbConfig');

/* GET home page. */
router.get('/', async(req, res)=> {
  const client = await MongoClient.connect(dburl);
  
  try{
    const db = await client.db(dbname);
    let business = await db.collection('business').find().toArray();

    res.json({
      statusCode: 200,
      message: "Business Fetched Successfully",
      data: business
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode: 500,
      messsage: "Internal Server Error"
    })
  }finally{
    client.close();
  }
});


router.get('/:id', async(req, res)=> {
  const client = await MongoClient.connect(dburl);
  
  try{
    const db = await client.db(dbname);
    let business = await db.collection('business').findOne({_id: mongodb.ObjectId(req.params.id)});

    res.json({
      statusCode: 200,
      message: "Business Fetched Successfully",
      data: business
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode: 500,
      messsage: "Internal Server Error"
    })
  }finally{
    client.close();
  }
});

router.delete('/:id', async(req, res)=> {
  const client = await MongoClient.connect(dburl);
  
  try{
    const db = await client.db(dbname);
    let business = await db.collection('business').deleteOne({_id: mongodb.ObjectId(req.params.id)});

    res.json({
      statusCode: 200,
      message: "Business Deleted Successfully",
      data: business
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode: 500,
      messsage: "Internal Server Error"
    })
  }finally{
    client.close();
  }
});

router.post('/', async(req,res) => {
  const client = await MongoClient.connect(dburl);
  try{
    
    const db = await client.db(dbname);
    let business = await db.collection('business').findOne({email:req.body.email})
    
    if(business){
      res.json({
        statusCode: 400,
        message: "Business Already exists"
      })
    }else{
      const business = await db.collection('business').insertOne(req.body)
      res.json({
        stausCode: 400,
        message: "Business created successfully"
      })
    }

  }catch(error){
    console.log(error)
    res.json({
      statusCode: 500,
      messsage: "Internal Server Error"
    })

  }finally{
    client.close(); 
  } 
})

router.put('/', async(req,res) => {
  const client = await MongoClient.connect(dburl);
  try{
    
    const db = await client.db(dbname);
    let business = await db.collection('business').findOneAndReplace({email:req.body.email},req.body)
     
    res.json({
      statusCode: 200,
      message: "Business Edited Successfully"
    })

  }catch(error){
    console.log(error)
    res.json({
      statusCode: 500,
      messsage: "Internal Server Error"
    })

  }finally{
    client.close(); 
  } 
})

module.exports = router;
