import { App, Stack } from 'aws-cdk-lib'
import { Function } from 'aws-cdk-lib/aws-lambda'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { CustomStackProps } from './types'
import { BucketProps, importBucket } from './utils/bucket'
import { setupS3Lambda, SetupS3LambdaProps } from './utils/s3Lambda'

export class S3LambdaStack extends Stack {
	pdfLambda?: Function
	bucket?: IBucket

	constructor(scope: App, id: string, config: CustomStackProps) {
		super(scope, id, config)

		console.log("CDK's config:", config)

		this.bucket = this.importBucket({
			bucketName: config.bucketName,
		})

		this.pdfLambda = this.setupS3Lambda({
			codePath: config.codeZipPath,
			pathPrefix: config.pathPrefix,
			handler: config.handler,
			bucket: this.bucket,
		})
	}

	importBucket(props: BucketProps) {
		return importBucket(this, props)
	}

	setupS3Lambda(props: SetupS3LambdaProps) {
		return setupS3Lambda(this, props)
	}
}
