# **Solana Transaction Decoder**

This repository provides a script to decode the arguments of a Solana transaction based on its transaction hash. Using the IDL (Interface Description Language) of the program, the script identifies the instructions in the transaction, decodes them, and outputs human-readable data.

## **Features**

- Decodes Solana transaction arguments using the Anchor IDL.
- Supports transactions with multiple instructions.
- Verifies and filters instructions related to a specific program.
- Handles decoding of complex data structures and accounts.

## **Prerequisites**

Before using the script, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** or **npm**
- **Solana CLI** for key management (optional)

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/solana-transaction-decoder.git
   cd svm-deserialize-instruction-data

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Ensure your program's IDL is available in the idl.json file within the repository.

## Usage

1. Open the script decodeTransaction.ts and replace the placeholders with your program's details:

Program Public Key: Replace ProgramPublicKeyHere with your program's public key.
Transaction Hash: Replace YourTransactionSignatureHere with the Solana transaction signature you want to decode.

2. Run the script get args

```bash
npx ts-node readArgs.ts
```
The output will like this:
```bash
{
  args: {
    data: { args1: <BN: 55128bf6d881>, args2: <BN: 3>, args3: [Object] },
    name: 'YourInstructionName'
  }
}
```

3. Run the script get event

```bash
npx ts-node readEvent.ts
```
The output will like this:
```bash
{
  event: {
    field_1: "field1",
    field_2: 'field2'
  }
}
```
