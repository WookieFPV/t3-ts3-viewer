import { QueryProtocol, TeamSpeak } from "ts3-nodejs-library";
import { env } from "~/env";

export const tsConnect = async () => {
  console.log(`ts connect (${env.TS3_HOST})`);
  const ts = await TeamSpeak.connect({
    host: env.TS3_HOST,
    queryport: 10011,
    serverport: 9987,
    protocol: QueryProtocol.RAW,
    username: env.TS3_USERNAME,
    nickname: env.TS3_NICKNAME,
    password: env.TS3_PASSWORD,
  }).catch((e) => {
    console.log("tsConnect error", e);
    //an error occurred during connecting
    throw e;
  });
  console.log("ts Connected");
  return ts;
};