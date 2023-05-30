const crypto = require("crypto");

// should be somewhere in constants.js file
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  // return Trivial partition key if there is no data
  // early return helps in understanding the logic and avoiding unnecessary code paths
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate;
  // check if partitionKey is provided and convert it to string
  if (event?.partitionKey) {
    candidate =
      typeof event?.partitionKey !== "string"
        ? JSON.stringify(event?.partitionKey)
        : event.partitionKey;
  }
  // we'll return the provided key if it's upto maximum length
  if (candidate && candidate?.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }
  // we'll create a new one if based on the event object and return the partitionKey
  return crypto
    .createHash("sha3-512")
    .update(JSON.stringify(event))
    .digest("hex");
};
