import sdk from 'aws-sdk'
import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

const s3 = new sdk.S3()
const bucket = process.env.S3_BUCKET

export const handler: APIGatewayProxyHandlerV2 = async (event, context, callback) => {
	try {
		if (!bucket) {
			throw new Error('Missing `S3_BUCKET` environment variables.')
		}

		const requestedPath = event.pathParameters?.proxy

		if (!requestedPath) {
			throw new Error('No `event.pathParameters?.proxy` provided, check your ApiGw settings.')
		}

		const objectKey = decodeURI(requestedPath)

		const object = await s3.getObject({ Bucket: bucket, Key: objectKey }).promise()

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
