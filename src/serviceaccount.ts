import { GoogleProvider } from '@cdktf/provider-google/lib/provider';
import { ServiceAccount } from '@cdktf/provider-google/lib/service-account';
import { TerraformStack } from 'cdktf';

export class MyServiceAccount {
  constructor(stack: TerraformStack, private provider: GoogleProvider) {
    new ServiceAccount(stack, 'service-account', {
      accountId: 'cdk-account',
      displayName: 'Created by CDK for Terraform',
      provider: this.provider,
    });
  }
}
