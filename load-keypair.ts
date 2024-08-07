import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const asArray = Uint8Array.from(JSON.parse(process.env["SOLANA_SECRET_KEY"]));
const keypair = Keypair.fromSecretKey(asArray);

console.log("Loaded keypair securely! Our public key is:", keypair.publicKey.toBase58());