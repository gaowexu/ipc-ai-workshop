import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as IpcAiDeploy from '../lib/ipc-ai-deploy-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new IpcAiDeploy.IpcAiDeployStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
