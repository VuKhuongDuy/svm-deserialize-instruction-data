import "dotenv/config";
import { clusterApiUrl, Connection, GetTransactionConfig } from "@solana/web3.js";
import { BorshCoder, Event, EventParser, Program } from "@coral-xyz/anchor";
import { IDL, MyProgram } from "../idl/program";

let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const getLog = async (
    tx: string,
    config?: GetTransactionConfig,
): Promise<string[] | null> => {
    const transactionInfo = await connection.getTransaction(tx, {
        commitment: "confirmed",
        ...config
    });

    if (!transactionInfo) {
        console.error('Transaction not found');
        return null;
    }

    return transactionInfo.meta?.logMessages || [];
}

const getEventFromTx = async (program: Program, name: string, tx: string, config?: GetTransactionConfig): Promise<Event[] | []> => {
    if (!name || !tx) {
        throw new Error('getEventFromTx name and tx are required')
    }
    const eventParser = new EventParser(program.programId, new BorshCoder(program.idl));
    const logs = await getLog(tx, config);
    
    if (!logs) return [];

    const parsedLogs = eventParser.parseLogs(logs);
    return Array.from(parsedLogs).filter(event => event.name === name);
}

const readEvent = async (txHash, programId) => {
    const program = new Program(IDL as MyProgram, programId, {
        connection: connection,
    });

    const tx = await getEventFromTx(program, "Event1", txHash)
    const event = tx[0].data;

    console.log({event})
};

readEvent("your_transaction_hash", "Your_program_id_here");
