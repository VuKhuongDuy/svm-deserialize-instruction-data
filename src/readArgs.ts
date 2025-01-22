import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import {
  BorshInstructionCoder,
  Program,
} from "@coral-xyz/anchor";
import { MyProgram, IDL } from "../idl/program";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

async function readTransaction(txSignature: string, programId: string) {
  // Fetch the transaction
  const transaction = await connection.getTransaction(txSignature);

  if (!transaction) {
    console.error("Transaction not found");
    return;
  }

  const program = new Program(IDL as MyProgram, new PublicKey(programId), {
    connection: connection,
  });

  // Loop through the transaction instructions
  for (const ix of transaction.transaction.message.instructions) {
    const programIdKey =
      transaction.transaction.message.accountKeys[ix.programIdIndex];

    // Ensure the instruction belongs to our program
    if (programIdKey.toBase58() !== program.programId.toBase58()) {
      console.log("Instruction not related to the program");
      continue;
    }

    let coder = new BorshInstructionCoder(IDL);
    let args = coder.decode(ix.data, "base58");
    console.log({ args });
  }
}

// Example usage
readTransaction(
  "your_transaction_hash",
  "Your_program_id_here"
).catch(console.error);
