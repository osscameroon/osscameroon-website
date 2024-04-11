export type EnvironmentVariables = {
  PORT: string;
  HOST: string;
  DATABASE_URL: string;
}

declare global {
  namespace NodeJS {
    // @ts-ignore
    interface ProcessEnv extends EnvironmentVariables {}
  }
}