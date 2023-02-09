import { App, Stack } from 'aws-cdk-lib'
import { Function } from 'aws-cdk-lib/aws-lambda'
import { CustomStackProps } from './types'
import { SetupS3LambdaProps, setupS3Lambda } from './utils/s3Lambda'

export class S3LambdaStack extends Stack {
	pdfLambda?: Function

	constructor(scope: App, id: string, config: CustomStackProps) {
		super(scope, id, config)

		console.log("CDK's config:", config)

		this.pdfLambda = this.setupPdfLambda({
			codePath: config.codeZipPath,
			handler: config.handler,
			bucketName: config.bucketName,
		})
	}

	setupPdfLambda(props: SetupS3LambdaProps) {
		return setupS3Lambda(this, props)
	}
}
