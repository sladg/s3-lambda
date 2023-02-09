import { CfnOutput, Duration, Stack } from 'aws-cdk-lib'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { IBucket } from 'aws-cdk-lib/aws-s3'

export interface SetupS3LambdaProps {
	handler: string
	codePath: string
	bucket: IBucket
	memory?: number
	timeout?: number
}

export const DEFAULT_MEMORY = 256
export const DEFAULT_TIMEOUT = 10

export const setupS3Lambda = (scope: Stack, { codePath, handler, bucket, memory = DEFAULT_MEMORY, timeout = DEFAULT_TIMEOUT }: SetupS3LambdaProps) => {
	const s3Lambda = new Function(scope, 'S3Lambda', {
		code: Code.fromAsset(codePath),
		runtime: Runtime.NODEJS_16_X,
		handler: handler,
		memorySize: memory,
		timeout: Duration.seconds(timeout),
		environment: {
			BUCKET_NAME: bucket.bucketName,
		},
	})

	bucket.grantRead(s3Lambda)

	new CfnOutput(scope, 's3LambdaArn', { value: s3Lambda.functionArn })

	return s3Lambda
}
