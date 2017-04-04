export default class Ultility {

    isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

}
