import { Transaction, VersionedTransaction } from "@solana/web3.js";

function getBase64Payload(serializedTransaction) {
  if (typeof serializedTransaction === "string") {
    return serializedTransaction;
  }

  if (serializedTransaction && typeof serializedTransaction === "object") {
    return (
      serializedTransaction.swapTransaction ||
      serializedTransaction.serializedTransaction ||
      serializedTransaction.transaction ||
      serializedTransaction.tx ||
      null
    );
  }

  return null;
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

function deserializeSwapTransaction(payload) {
  const bytes = base64ToBytes(payload);

  try {
    return VersionedTransaction.deserialize(bytes);
  } catch (versionedError) {
    try {
      return Transaction.from(bytes);
    } catch (legacyError) {
      const error = new Error(
        "Failed to deserialize swap transaction payload.",
      );
      error.versionedError = versionedError;
      error.legacyError = legacyError;
      throw error;
    }
  }
}

export async function signSwapTransaction(wallet, serializedTransaction) {
  if (!wallet?.connected) {
    throw new Error("Wallet is not connected.");
  }

  const payload = getBase64Payload(serializedTransaction);

  if (!payload || typeof payload !== "string") {
    throw new TypeError(
      "Expected a base64 swap transaction string or an object containing one.",
    );
  }

  const transaction = deserializeSwapTransaction(payload);

  try {
    const signed = await wallet.signTransaction(transaction);
    return bytesToBase64(new Uint8Array(signed.serialize()));
  } catch (error) {
    console.error("Wallet signing failed", {
      walletName: wallet.name,
      transactionType: transaction.constructor.name,
      payloadLength: payload.length,
      error,
    });

    if (typeof wallet.signAllTransactions === "function") {
      try {
        const [signed] = await wallet.signAllTransactions([transaction]);
        return bytesToBase64(new Uint8Array(signed.serialize()));
      } catch (allError) {
        console.error("Fallback signAllTransactions failed", allError);
      }
    }

    throw error;
  }
}
