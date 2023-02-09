import path from 'path'

export { handler } from './s3-handler'
export { S3LambdaStack } from './cdk/stack'
export { CustomStackProps } from './cdk/types'
import { SetupS3LambdaProps, setupS3Lambda } from './cdk/utils/s3Lambda'

export const codePath = path.resolve(__dirname, './code.zip')

export const CdkUtils = {
	setupS3Lambda,
}

export { SetupS3LambdaProps }
