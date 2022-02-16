export function checkEnv() {
  require('dotenv').config();

  const envVarNames = ['API_PORT', 'API_ALLOWED_HOST'];

  let missingVars = '';

  envVarNames.forEach(envVarName => {
    if (!process.env[envVarName]) {
      missingVars += envVarName + '\n';
    }
  });

  if (missingVars.length > 0) {
    throw new Error('Missing environment variables:\n' + missingVars);
  } else {
    console.log('Environment variables check successful.');
  }
}
