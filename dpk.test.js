const { deterministicPartitionKey } = require("./dpk");

// this could be imported from mock file
const VALID_PARTITION_KEY = "TXe8fNepAL4#ft";
const LONG_PARTITION_KEY =
  "TXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ft";
const MAX_LENGTH_PARTITION_KEY =
  "TXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#ftTXe8fNepAL4#eNaN()eNaN()eNaN()eNaN()eNaN()eNaN()eNaN()eNaN()";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey when passed in event within character limit", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: LONG_PARTITION_KEY,
    });
    expect(trivialKey).not.toBe(LONG_PARTITION_KEY);
  });

  it("Returns the partitionKey when passed in as object", () => {
    const sampleKey = { sample: VALID_PARTITION_KEY };
    const trivialKey = deterministicPartitionKey({
      partitionKey: sampleKey,
    });
    expect(trivialKey).toBe(JSON.stringify(sampleKey));
  });

  it("Returns the partitionKey when passed in event within max character limit", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: MAX_LENGTH_PARTITION_KEY,
    });
    expect(trivialKey).toBe(MAX_LENGTH_PARTITION_KEY);
  });

  it("Returns the generated partitionKey when passed in event which exceeds character limit", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: LONG_PARTITION_KEY,
    });
    expect(trivialKey).not.toBe(LONG_PARTITION_KEY);
  });

  it("Returns the generated partitionKey when passed in event without partition key", () => {
    const trivialKey = deterministicPartitionKey({
      someOtherKey: VALID_PARTITION_KEY,
    });
    expect(trivialKey).not.toBe(VALID_PARTITION_KEY);
  });
});
