function Base64() {
  // private property

  // public method for encoding
  this.encode = input => {
    let output = '';
    let i = 0;
    while (i < input.length) {
      output += input[i] > 0x0f ? input[i].toString(16) : `0${input[i].toString(16)}`;
      i++;
    }
    return output;
  };

  // public method for decoding
  this.decode = input => {
    const output = [];
    let enc1, enc2;
    let i = 0;
    let j = 0;
    while (i < input.length) {
      enc1 = input.charCodeAt(i++);
      if (enc1 >= 0x30 && enc1 <= 0x39) {
        enc1 -= 0x30;
      } else if (enc1 >= 0x41 && enc1 <= 0x46) {
        enc1 -= 0x37;
      } else if (enc1 >= 0x61 && enc1 <= 0x66) {
        enc1 -= 0x57;
      }
      enc2 = input.charCodeAt(i++);
      if (enc2 >= 0x30 && enc2 <= 0x39) {
        enc2 -= 0x30;
      } else if (enc2 >= 0x41 && enc2 <= 0x46) {
        enc2 -= 0x37;
      } else if (enc2 >= 0x61 && enc2 <= 0x66) {
        enc2 -= 0x57;
      }
      // eslint-disable-next-line no-bitwise
      output[j] = enc1 << 4;
      output[j] += enc2;
      j++;
    }
    return output;
  };
}

const base = new Base64();

// eslint-disable-next-line import/prefer-default-export
export function decode(str) {
  if (!str) {
    return '';
  }
  return base.decode(str);
}

export function encode(str) {
  if (!str) {
    return '';
  }
  return base.encode(str);
}
