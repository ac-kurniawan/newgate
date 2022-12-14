import { PBKDF2 } from './crypto';
describe('crypto -- PBKDF2', () => {
  it('should generate correct hash', () => {
    const encrypter = new PBKDF2(
      '2ea9c9b889f95c36d1460eecbaa25bc4f2e9bb323a5a76e4affa2ece9b42561d'
    );
    const hash = encrypter.encrypt('test123');
    expect(hash).toBe('c7834e4bb3b91463e75efb4dcffeedde');
  });

  it('should be valid', () => {
    const encrypter = new PBKDF2(
      '2ea9c9b889f95c36d1460eecbaa25bc4f2e9bb323a5a76e4affa2ece9b42561d'
    );
    const validate = encrypter.validate(
      'test123',
      'c7834e4bb3b91463e75efb4dcffeedde'
    );
    expect(validate).toBeTruthy();
  });
});
