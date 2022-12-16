const addDataSuffix = (data) => {
    let dateStr = data.toString();
    


const lastChar = dataStr.charAt(dataStr.length - 1);

if (lastChar === '1' && dataStr !== '11') {
    dateStr = `${dateStr}st`;
} else if (lastChar === '2' && dataStr !== '12') {
    dateStr = `${dateStr}nd`;
} else if (lastChar === '3' && dataStr !== '13') {
    dateStr = `${dateStr}rd`;
} else {
    dateStr = `${dateStr}th`;
}
return dateStr;

};

module.exports = (timestamp, { monthLength = 'short', format = 'long' } = {}) => {
    let months;
    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec',
        };
    } else {
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December',
        };
    }

    let dateObj = new Date(timestamp);
    let formattedDate;
    if (format === 'short') {
        formattedDate = `${months[dateObj.getMonth()]} ${addDataSuffix(dateObj.getDate())}, ${dateObj.getFullYear()}`;
    } else {
        formattedDate = `${addDataSuffix(dateObj.getDate())} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }

    return formattedDate;
};