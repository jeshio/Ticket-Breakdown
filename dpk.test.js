const { deterministicPartitionKey } = require("./dpk");

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test('should return the provided partition key', () => {
    const event = {
      partitionKey: 'my-partition-key'
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('my-partition-key');
  });

  test('should return a hash based on event data', () => {
    const event = {
      id: 1,
      type: 'my-event',
      data: {
        message: 'hello world'
      }
    };
    const expectedHash = '68fc1190b95070c6394400d714376bd3d9d6b9eb7811d6b548571fc46f14bf680b0c3fd734d90dc4cd291c67456bc1355d4921ca09fd5548eb5ea09f14d4a76f';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });

  test('should handle non-string partition key input', () => {
    const event = {
      partitionKey: 123
    };
    const expectedResult = '123';
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedResult);
  });

  test('should truncate partition key if it exceeds max length', () => {
    const longKey = 'a'.repeat(257);
    const expectedHash = '5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785';
    const event = {
      partitionKey: longKey
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedHash);
  });

  test("should return a same partition key when given a partition key string of length 256", () => {
    const partitionKey = "a".repeat(256);
    const input = {
      partitionKey,
    };
    const result = deterministicPartitionKey(input);
    expect(result).toBe(partitionKey);
  });

  test("should return a hash when given a string of length 256", () => {
    const input = "a".repeat(256);
    const expectedHash = "322031bac1d6554d4f68f8d2c9bbc3a38888aaf8f0bb1931b3e87ceaf5365d860775abee15c86dc44c0c33ef6c8f6458396af97e90ec8f51c657c2bffbd97dd3";
    const result = deterministicPartitionKey(input);
    expect(result).toBe(expectedHash);
  });

  test("should return a hash of length 128 even when given a string of length 8192", () => {
    const input = "a".repeat(8192);
    const result = deterministicPartitionKey(input);
    expect(result.length).toEqual(128);
  });
});