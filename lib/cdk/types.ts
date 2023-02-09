import { StackProps } from 'aws-cdk-lib'

export interface CustomStackProps extends StackProps {
	codeZipPath: string
	bucketName: string
	handler: string
}
