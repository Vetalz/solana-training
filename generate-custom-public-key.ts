import { Keypair } from "@solana/web3.js";

const generateCustomPublicKey = (customStr: string) => {
  let attempt = 0;
  let isFind = false;
  let publicKey: string;
  let privateKey: Uint8Array;
  let spentTime: string;
  const start = new Date().getTime();

  while(!isFind) {
    const keypair = Keypair.generate();
    publicKey = keypair.publicKey.toBase58();
    privateKey = keypair.secretKey;
    const prefix = publicKey.slice(0, customStr.length).toLowerCase();
    if (prefix === customStr.toLowerCase()) {
      isFind = true;
      const end = new Date().getTime();
      spentTime = `${(end - start)/1000} sec`;
    }
    attempt += 1;
  }

  return {
    publicKey,
    privateKey,
    attempt,
    spentTime
  }
}

const result = generateCustomPublicKey("anza");
console.log(result);