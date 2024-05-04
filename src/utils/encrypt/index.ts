import JsEncrypt from 'jsencrypt';

/**
 * rsa加密密码
 * @param {string} password
 * @returns
 */
export const encryptPassword = (password: string) => {
  const encrypt = new JsEncrypt({});
  encrypt.setPublicKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRzv+ez8OvPfzncOQrS4bz2bSTRecaxjKp9fV7iukfLeU9kpOX0+ZNneahtSq5/HJWXBE4P4D5j+STlHIF7rNbue620yRLteYOpYqI3m9QBF9yH08b6yAn1nsTcRy4TeMPA6xDCYzI961E/1e89HGRZ4JlS+L1I4df3RK6lUHYjQIDAQAB',
  );
  return encrypt.encrypt(password);
};
