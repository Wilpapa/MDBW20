const { Stitch, AnonymousCredential } = require('mongodb-stitch-server-sdk');

Stitch.initializeDefaultAppClient('0-mdbw20-sskas');
const client = Stitch.defaultAppClient;

console.log("logging in anonymously");
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});

createAllFiles("2020-01-01");
client.close()
return 0;

async function createAllFiles(sdate) {
	let startDate=new Date(sdate);
	let numdays = 150
	var i
	for (i =0;i<numdays;i++) {
        	stringDate=startDate.toISOString().split('T')[0] 
		res= await createFile(stringDate); 
//	console.log(stringDate)
		startDate.setDate(startDate.getDate() + 1);
	}
}



async function createFile(sdate) {
        console.log("Creating file for day ", sdate," at ", Date());
	await client.callFunction("saveDayToS3", [sdate]).then(echoedResult => {
  		console.log(`Echoed result: ${echoedResult}`);
	});
	console.log("Finished storing ", sdate, " at ", Date());
}

