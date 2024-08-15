import "dotenv/config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection, sendAndConfirmTransaction, TransactionInstruction,
} from "@solana/web3.js";

let privateKey = process.env.SOLANA_SECRET_KEY;
if (privateKey === undefined) {
  console.log("Add secret key to .env");
  process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log("Our public key is:", sender.publicKey.toBase58());

const recipient = new PublicKey("2nnUmvSjXFoS5s9ev7DaDciXpntzNP9tthge8B5tBT2R");
console.log("Attempting to send 0.1 SOL to ", recipient.toBase58());

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.1 * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
const memoText = "Hello from Solana";

const addMemoInstraction = new  TransactionInstruction({
  keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf8"),
  programId: memoProgram,
});

transaction.add(addMemoInstraction);

console.log("memo is", memoText);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log("Transaction confirmed, signature:", signature);