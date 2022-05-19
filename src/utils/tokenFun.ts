const jwt = require('jsonwebtoken');

export const createToken = (payload: string): string => {
  const tokenValue = jwt.sign({ id: payload }, process.env.SALT, {
    expiresIn: process.env.EXPIRESTOKEN,
  });
  return tokenValue;

  // salt 문자열이 들어가야함
  // expiresIn {expiresIn: '1h'}
};

export const createRefreshToken = (payload: string): string => {
  const tokenValue = jwt.sign({ ID: payload }, process.env.SALT, {
    expiresIn: process.env.EXPIRESREFRESHTOKEN,
  });
  return tokenValue;

  // salt 문자열이 들어가야함
  // expiresIn {expiresIn: '1h'}
};

export const checkToken = async (headers: any): Promise<object> => {
  const token = headers.authorization.split(' ')[1];
  let decode: object;
  console.log('토큰 분리');
  try {
    console.log('SALT : ', process.env.SALT);
    console.log('TOKEN : ', token);
    decode = jwt.verify(token, process.env.SALT);
  } catch (err) {
    const error: number = 401;
    return { error, message: err.message };
  }
  console.log('decode : ', decode);
  return decode;
};

export const checkRefreshToken = async (headers: any) => {
  const token = headers.authorization.split(' ')[1];
  let decode: object;
  console.log('토큰 분리');
  try {
    console.log('SALT : ', process.env.SALT);
    console.log('TOKEN : ', token);
    decode = jwt.verify(token, process.env.SALT);
  } catch (err) {
    throw { status: 401, message: err.message };
  }
  console.log('decode : ', decode);
  return decode;
};
