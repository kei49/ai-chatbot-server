const getEnvVariable = (literal: string) => {
  if (!(literal in process.env)) {
    throw new Error(`Variabel ${literal} needs to be declaired`);
  }
  return process.env[literal];
};

export default () => ({
  database: {
    dialect: getEnvVariable('DB_DIALECT'),
    host: getEnvVariable('DB_HOST'),
    port: parseInt(getEnvVariable('DB_PORT') || '') || 5432,
    name: getEnvVariable('DB_NAME') || 'ai-chatbot-server',
  },
});
