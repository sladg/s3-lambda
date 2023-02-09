import { App } from 'aws-cdk-lib'
import path from 'path'
import { S3LambdaStack } from './stack'

const app = new App()

if (!process.env.STACK_NAME) {
	throw new Error('Name of CDK stack was not specified!')
}

if (!process.env.BUCKET_NAME) {
	throw new Error('BUCKET_NAME was not specified and is required!')
}

new S3LambdaStack(app, process.env.STACK_NAME, {
	codeZipPath: path.resolve(__dirname, '../../dist/code.zip'),
	handler: 'index.handler',
	bucketName: process.env.BUCKET_NAME,
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.AWS_REGION ?? process.env.CDK_DEFAULT_REGION,
	},
})

app.synth()
