const env = process.env.NODE_ENV || 'local';
const availabeNodeEnv = ['local', 'development', 'producton', 'test'];

if (!availabeNodeEnv.includes(env)) {
  throw new Error(`Invalid NODE_ENV: please set the value`);
}

export const getEnvFilePaths = () => [`.env.${env}`, '.env'];
