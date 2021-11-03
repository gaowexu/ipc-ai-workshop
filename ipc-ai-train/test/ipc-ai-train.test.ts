import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as IpcAiTrain from '../lib/ipc-ai-train-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new IpcAiTrain.IpcAiTrainStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
