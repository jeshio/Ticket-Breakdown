const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const get128LengthHash = (inputString) => crypto.createHash("sha3-512").update(inputString).digest("hex")

exports.deterministicPartitionKey = (event) => {
  if (!event) { return TRIVIAL_PARTITION_KEY; }

  let candidate = event?.partitionKey || get128LengthHash(JSON.stringify(event));

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  // if it already hashed its length is 128 and will be returned as is
  return candidate.length <= MAX_PARTITION_KEY_LENGTH ? candidate : get128LengthHash(candidate);
};