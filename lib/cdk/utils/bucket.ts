import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'

export interface BucketProps {
	bucketName: string
}

export const importBucket = (scope: Stack, { bucketName }: BucketProps) => {
	const bucket = Bucket.fromBucketName(scope, 'ImportedBucket', bucketName)

	new CfnOutput(scope, 'BucketArn', { value: bucket.bucketArn })

	return bucket
}
