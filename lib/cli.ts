#!/usr/bin/env node

import { Command } from 'commander'
import path from 'path'
import packageJson from '../package.json'
import { deployHandler } from './cli/deploy'
import { removeHandler } from './cli/remove'
import { wrapProcess } from './utils'

const program = new Command()
const stackName = 'S3LambdaStack'
const region = 'eu-central-1'

program
	//
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version)

program
	.command('deploy')
	.description('Deploy S3 Lambda via CDK')
	.option('--stackName <name>', 'Name of the stack to be deployed.', stackName)
	.option('--appPath <path>', 'Absolute path to app.', path.resolve(__dirname, '../dist/cdk/app.js'))
	.option('--region <region>', 'AWS region.', region)
	.option('--bootstrap', 'Bootstrap CDK stack.', false)
	.option('--bucketName <name>', 'Name of the bucket to be used.')
	.option('--pathPrefix <path>', 'Specify path used in ApiGw as prefix, this will get removed from path while requesting S3 object.', undefined)
	.action(async (options) => {
		console.log('Our config is: ', options)
		const { stackName, appPath, region, bootstrap, bucketName, pathPrefix } = options
		wrapProcess(deployHandler({ stackName, appPath, region, bootstrap, bucketName, pathPrefix }))
	})

program
	.command('remove')
	.description('Remove S3 Lambda via CDK')
	.option('--stackName <name>', 'Name of the stack to be deployed.', stackName)
	.option('--appPath <path>', 'Absolute path to app.', path.resolve(__dirname, '../dist/cdk/app.js'))
	.option('--region <region>', 'AWS region.', region)
	.action(async (options) => {
		console.log('Our config is: ', options)
		const { stackName, appPath, region } = options
		wrapProcess(removeHandler({ stackName, appPath, region }))
	})

program.parse(process.argv)
