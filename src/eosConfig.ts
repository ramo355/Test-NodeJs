export const eosConfig = {
  apiUrl: process.env.EOS_API_URL || "",
  accountName: process.env.EOS_ACCOUNT_NAME || "",
  pos: parseInt(process.env.EOS_POS || "-1", 10),
  offset: parseInt(process.env.EOS_OFFSET || "-100", 10),
};
