exports = function(fileName) {
  // Instantiate an S3 service client
  const s3Service = context.services.get('s3-bucket').s3('eu-west-3');
  
  // Get the object from S3
  return s3Service.GetObject({
    'Bucket': "gmeister",
    'Key': fileName,
  })
  .then(getObjectOutput => {
    return JSON.parse(getObjectOutput.Body.text());
  })
  .catch(console.error);
};