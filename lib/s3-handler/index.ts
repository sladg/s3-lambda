import sdk from 'aws-sdk'
import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

const s3 = new sdk.S3()
const bucket = process.env.BUCKET_NAME
const pathPrefix = process.env.PATH_PREFIX

export const handler: APIGatewayProxyHandlerV2 = async (event, context, callback) => {
	try {
		console.log('Event: ', event)

		if (!bucket) {
			throw new Error('Missing `BUCKET_NAME` environment variables.')
		}

		let requestedPath = event.pathParameters?.proxy

		if (!requestedPath) {
			throw new Error('No `event.pathParameters?.proxy` provided, check your ApiGw settings.')
		}

		if (pathPrefix && pathPrefix.length > 1) {
			console.log('Removing part of path: ', pathPrefix)
			requestedPath.replace(pathPrefix, '')
		}

		console.log('Requesting path: ', requestedPath)
		const object = await s3.getObject({ Bucket: bucket, Key: requestedPath }).promise()

		const objectContent = object.ContentType
		if (!objectContent) {
			throw new Error('No `object.ContentType` provided, check your S3 settings.')
		}

		const objectBody = object.Body?.toString('base64')
		return {
			statusCode: 200,
			headers: { 'Content-Type': objectContent },
			body: objectBody,
			isBase64Encoded: true,
		}
	} catch (err: any) {
		console.error(err)

		return {
			statusCode: 500,
			body: JSON.stringify({ error: err.toString() }),
		}
	}
}
