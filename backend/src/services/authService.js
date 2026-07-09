const crypto = require("crypto");
const supabase = require("../config/supabase");
const nacl = require("tweetnacl");
const bs58 = require("bs58").default;

const userRepository = require("../repositories/userRepository");
const { generateToken } = require("../utils/jwt");

async function createChallenge(walletAddress) {
  // Generate a random nonce
  const nonce = crypto.randomBytes(32).toString("hex");

  // Expires in 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Remove any previous challenge for this wallet
  await supabase
    .from("auth_challenges")
    .delete()
    .eq("wallet_address", walletAddress);

  // Save the new challenge
  const { error } = await supabase.from("auth_challenges").insert([
    {
      wallet_address: walletAddress,
      nonce,
      expires_at: expiresAt.toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }
  const timestamp = new Date().toISOString();
  return {
    message: `Welcome to Walfi

Sign this message to authenticate with Walfi.

This request will not trigger a blockchain transaction or cost any SOL.

Nonce:
${nonce}

Timestamp:
${timestamp}
`,
    nonce,
  };
}

async function verifySignature(body) {
  const { wallet, signature, message } = body;

  const challenge = await userRepository.findChallenge(wallet);

  if (!challenge) {
    throw new Error("Challenge not found.");
  }

  if (new Date() > new Date(challenge.expires_at)) {
    await userRepository.deleteChallenge(wallet);

    throw new Error("Challenge expired.");
  }

  const verified = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(signature),
    bs58.decode(wallet),
  );

  if (!verified) {
    throw new Error("Invalid signature.");
  }

  let user = await userRepository.findByWallet(wallet);

  if (!user) {
    user = await userRepository.createUser(wallet);
  }

  await userRepository.updateLastLogin(user.id);

  await userRepository.deleteChallenge(wallet);

  const token = generateToken(user);

  return {
    token,
    user,
  };
}

module.exports = {
  createChallenge,
  verifySignature,
};
