import { VersionedTransaction } from "@solana/web3.js";

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

  const transaction = VersionedTransaction.deserialize(base64ToBytes(payload));

  const signed = await wallet.signTransaction(transaction);

  return bytesToBase64(new Uint8Array(signed.serialize()));
}
