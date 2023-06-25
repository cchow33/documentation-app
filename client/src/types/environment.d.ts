export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production";
      PORT: number;
      // LIVE_URL: string;
      BASE_URL: string;
      MONGO_URI: string;
    }
  }
}
