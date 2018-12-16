import { ClientTimestampPipe } from './client-timestamp.pipe';

describe('ClientTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new ClientTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
