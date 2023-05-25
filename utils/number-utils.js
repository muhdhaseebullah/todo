class NumberUtils {
    static leftPad(number, targetLength) {
        let output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    };

    static getPercentage(numerator, denominator) {
        if (numerator === 0 || denominator === 0) {
            return 0 + " %";
        } else {
            let value = numerator / denominator;
            return (value * 100).toFixed(0) + " %";
        }

    }
}

module.exports = NumberUtils;
