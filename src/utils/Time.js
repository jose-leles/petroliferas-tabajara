export default {
    timestampToDDMMYYY: (timestamp) => {
        var date = new Date(timestamp * 1000);
        // Hours part from the timestamp
        var days = date.getDate();
        var daysFormated = days > 9 ? days : "0" + days 
        var months = date.getMonth() + 1;
        var monthsFormated = months > 9 ? months : "0" + months 
        var year = date.getFullYear();
        
        return daysFormated + "/" + monthsFormated + "/" + year
    },
    dateToTimestamp: (value) => {
        var parts = value.trim().split(' ');
        var date = parts[0].split('-');
        var time = (parts[1] ? parts[1] : '00:00:00').split(':');

        // NOTE:: Month: 0 = January - 11 = December.
        var d = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
        return d.getTime() / 1000;
    },
    diffInDays: (timestamp) => {
        var curr = new Date().getTime() / 1000;
        var diff = timestamp - curr;
        
        return Math.round(diff / 86400);
    }
}