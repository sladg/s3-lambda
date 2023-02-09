import { executeAsyncCmd } from '../utils'

interface Props {
	stackName: string
	appPath: string
	region: string
	bootstrap: boolean
	bucketName: string
	pathPrefix?: string
}

const cdkExecutable = require.resolve('aws-cdk/bin/cdk')

export const deployHandler = async ({ stackName, appPath, region, bootstrap, bucketName, pathPrefix }: Props) => {
	// All paths are absolute.
	const cdkApp = `node ${appPath}`
	const cdkCiFlags = `--require-approval never --ci`

	const variables = {
		STACK_NAME: stackName,
		...(region && { AWS_REGION: region }),
		...(bucketName && { BUCKET_NAME: bucketName }),
		...(pathPrefix && { PATH_PREFIX: pathPrefix }),
	}

	if (bootstrap) {
		await executeAsyncCmd({
			cmd: `${cdkExecutable} bootstrap --app "${cdkApp}"`,
			env: variables,
		})
	}

	await executeAsyncCmd({
		cmd: `${cdkExecutable} deploy --app "${cdkApp}" ${cdkCiFlags}`,
		env: variables,
	})
}
