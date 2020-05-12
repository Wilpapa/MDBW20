exports = function(doc, fileName) {
  // Doc is a string here (multiple JSON docs)
  // Instantiate an S3 service client
  const s3Service = context.services.get('s3-bucket').s3('eu-west-3');
  
  const filePath = "IOT/" + fileName
  const fileType = "text/html"
  console.log("uploadS3FromJSON writing file ", fileName)
  
  // Put the object to S3
  return s3Service.PutObject({
    'Bucket': "gmeister",
    'Key': filePath,
    'ContentType': fileType,
    'Body': doc
  })
  .then(putObjectOutput => {
    console.log(putObjectOutput);
    return putObjectOutput;
  })
  .catch(console.error);
};