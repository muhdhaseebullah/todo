const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

const myBucket = process.env.S3_BUCKET;

/*
const fileName = 'dem1.png';
//for text file
//fs.readFile('demo.txt', function (err, data) {
//for Video file
//fs.readFile('demo.avi', function (err, data) {
//for image file
fs.readFile('/home/ceeayaz/demo.png', function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }


    params = { Bucket: myBucket, Key: fileName, Body: data, ACL: 'public-read' };

    s3.putObject(params, function (err, data) {

        if (err) {

            console.log(err)

        } else {

            console.log("Successfully uploaded data to myBucket/myKey---" + s3Object.getObjectContent().getHttpRequest().getURI());

        }

    });

});*/


async function uploadFile(buffer, filename) {
    // console.log("Uploading on S3[" + filename + "]");
    return await s3.putObject({ Bucket: myBucket, Key: filename, Body: buffer, ACL: 'public-read' }).promise();
}


module.exports = {
    uploadFile: uploadFile
};
