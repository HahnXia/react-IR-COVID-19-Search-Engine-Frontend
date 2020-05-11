class DateParser {
    static parseDate(date) {
        return date.split('T')[0];
    }
}


export default DateParser;
