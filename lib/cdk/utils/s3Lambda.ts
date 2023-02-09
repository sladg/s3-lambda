import { CfnOutput, Duration, Stack } from 'aws-cdk-lib'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'

export interface SetupS3LambdaProps {
	handler: string
	codePath: string
	bucketName: string
	memory?: number
	timeout?: number
}

export const DEFAULT_MEMORY = 256
export const DEFAULT_TIMEOUT = 10

export const setupS3Lambda = (scope: Stack, { codePath, handler, bucketName, memory = DEFAULT_MEMORY, timeout = DEFAULT_TIMEOUT }: SetupS3LambdaProps) => {
	const s3Lambda = new Function(scope, 'S3Lambda', {
		code: Code.fromAsset(codePath),
		runtime: Runtime.PYTHON_3_8,
		handler: handler,
		memorySize: memory,
		timeout: Duration.seconds(timeout),
		environment: {
			BUCKET_NAME: bucketName,
		},
	})

	new CfnOutput(scope, 's3LambdaArn', { value: s3Lambda.functionArn })

	return s3Lambda
}
