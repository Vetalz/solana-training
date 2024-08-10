import "dotenv/config";
import { Keypair } from "@solana/web3.js";

export const loadKeypair = () => {
  const asArray = Uint8Array.from(JSON.parse(process.env["SOLANA_SECRET_KEY"]));
  const keypair = Keypair.fromSecretKey(asArray);
  const publicKey = keypair.publicKey;

  // console.log("Loaded keypair securely! Our public key is:", publicKey.toBase58());

  return publicKey;
};
