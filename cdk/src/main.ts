import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as certificate from 'aws-cdk-lib/aws-certificatemanager';
import { CachePolicy } from 'aws-cdk-lib/aws-cloudfront';

export class BlogStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'BlogBucket', {
      bucketName: 'hasan-joint-blog'
    });

    bucket;

    const cert = certificate.Certificate.fromCertificateArn(this, 'CertificateACM', 'arn:aws:acm:us-east-1:248534195903:certificate/287bbaa3-96a1-416a-b0dd-d7bd6551acc4');

    const oaid = new cf.OriginAccessIdentity(this, 'OriginAccessIdentity');

    const cloudfrontDistro = new cf.Distribution(this, 'BlogDistribution', {
      domainNames: ['therealhasan.com', '*.therealhasan.com'],
      certificate: cert,
      defaultBehavior: {
        origin: new origins.S3Origin(bucket, {originAccessIdentity: oaid}),
        cachePolicy: CachePolicy.CACHING_DISABLED
      },
      defaultRootObject: 'index.html'
    })

    cloudfrontDistro;

    const hostedZone = r53.HostedZone.fromLookup(this, 'HasanZone', {
      domainName: 'therealhasan.com'
    });

    const record = new r53.ARecord(this, 'BlogRecord', {
      zone: hostedZone,
      target: r53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cloudfrontDistro)),
      recordName: 'blog'
    });

    record;
  }
}

const env = {
  account: '248534195903', // the-real-hasan
  region: 'us-east-1',
};

const app = new App();

new BlogStack(app, 'BlogStack', { env });

app.synth();