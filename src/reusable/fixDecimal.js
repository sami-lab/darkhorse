function fixDecimal(number) {
    if (Number.isInteger(number)) {
      return number.toString();
    } else {
      return number.toFixed(2);
    }
  }

  export default fixDecimal;
