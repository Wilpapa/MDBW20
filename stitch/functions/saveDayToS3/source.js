exports = function(arg){
// Queries and write a single day into a Datalake file in the bucket
// arg = date string, ie '2020-02-10T00:00:00Z' or '2020-02-10'

  const dateString = arg;
  let startDate=new Date(dateString);
  
  if (isNaN(startDate)) { 
    console.log(arg, "is not a valid date."); 
    return 1;
    }
  
  let endDate=new Date(dateString);
  endDate.setDate(endDate.getDate() + 1);
  let fileName = startDate.toISOString() + "-" + endDate.toISOString()
  
  console.log("Preparing S3 write from ", startDate, " to ", endDate);
  
  let collection = context.services.get("mongodb-atlas").db("world").collection("iot");
  //const query = { "measureDate": {"$gte":startDate,"$lte":endDate} };
  //const projection = { "_id": 0 };

  match={"$match":{ "measureDate":{"$gte":startDate,"$lt":endDate}}}
  unwind={"$unwind":"$values"}
  project={"$project":{"_id":0,"id":1,"measureUnit":1, "measuredValue":"$values.measuredValue","measureDate":{"$add":[ "$measureDate",{"$multiply":["$values.measureMinute",60000]}]}}}
  limit={"$limit":100}
  
  fileString = ""; // will contain all the records for the selected day 
  collection.aggregate([match,unwind,project])
    .toArray()
    .then(items => {
     items.forEach((doc) => 
        { 
          //console.log(EJSON.stringify(doc, null, 2)) 
          fileString = fileString + EJSON.stringify(doc) + "\n"
        });
        var result =  context.functions.execute("uploadS3FromJSON", fileString, fileName);
        console.log(`Successfully found ${items.length} documents.`);
    })
    .catch(err => console.error(`Failed to find documents: ${err}`));
};