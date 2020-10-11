const AWS = require('aws-sdk')

exports.createS3Client = () => {
	const s3Client = new AWS.S3({
	    apiVersion: '2006-03-01',
	    region: 'us-east-1'
	})

	return s3Client
}

exports.getInputFromS3 = async ({ Key, Bucket }) => {
	const client = exports.createS3Client()

	const result = (await (client.getObject({ Key, Bucket }).promise()))
		.Body
		.toString('utf-8')

	return result
}

exports.putOutputToS3 = async ({ Key, Bucket, Body }) => {
	const client = exports.createS3Client()

	const result = (await (client.putObject({
		Key,
		Bucket,
		Body
	}).promise()))

	return result
}