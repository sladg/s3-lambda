# S3Lambda

S3 is a simple AWS Lambda function that allows for integration between HttpApi (v2) and S3. This integration is currently not supported on HttpApi resulting in need to use HttpIntegration and having bucket on `public-read` which is not desired.

This function circumvents this limitation by standing between ApiGateway and S3 and proxying events.

## Usage

Very simple and straight forward `npx --package @sladg/s3-lambda cli deploy`. Pass `--help` in the end for all options and configuration.

In case you want to clean it up, use `npx --package @sladg/s3-lambda cli remove`.

Command will output "s3LambdaArn" that you can use to make requests.
