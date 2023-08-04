import { Construct } from 'constructs';
import { App, GcsBackend, TerraformStack } from 'cdktf';
import { GoogleProvider } from '@cdktf/provider-google/lib/provider';
import { MyServiceAccount } from './serviceaccount';

class MyStack extends TerraformStack {
  private readonly googleProvider: GoogleProvider;

  public get provider(): GoogleProvider {
    return this.googleProvider;
  }

  constructor(scope: Construct, name: string) {
    super(scope, name);

    this.googleProvider = new GoogleProvider(this, 'google', {
      project: process.env.PROJECT_ID,
    });

    new GcsBackend(this, {
      bucket: process.env.PROJECT_ID + '-terraform-state',
      prefix: 'terraform/cdk-state',
    });
  }
}

const app = new App();
const stack = new MyStack(app, process.env.PROJECT_ID || 'my-stack');
new MyServiceAccount(stack, stack.provider);

app.synth();
