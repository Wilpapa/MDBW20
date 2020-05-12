exports = function() {
  today=new Date();
  stringDate=today.toISOString().split('T')[0];
  const result = context.functions.execute("saveDayToS3", stringDate);
  console.log("ran trigger for date ", stringDate)
};
