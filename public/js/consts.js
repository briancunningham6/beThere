/**
 * Created by Brian Cunningham
 * User: user
 * Date: 08/11/2013
 * Time: 08:54
 */

var consts = {
        getDays : function(){
            days = [
                {dayId : 0, dayName : 'Monday' },
                {dayId : 1, dayName : 'Tuesday' },
                {dayId : 2, dayName : 'Wednesday' },
                {dayId : 3, dayName : 'Thursday' },
                {dayId : 4, dayName : 'Friday' },
                {dayId : 5, dayName : 'Saturday' },
                {dayId : 6, dayName : 'Sunday' }
            ];
            return days
        },

        getEveningTimes : function(){
            times = [
                {timeId : 0, timeName : '17:00' },
                {timeId : 1, timeName : '17:15' },
                {timeId : 2, timeName : '17:30' },
                {timeId : 3, timeName : '17:45' },
                {timeId : 4, timeName : '18:00' },
                {timeId : 5, timeName : '18:15' },
                {timeId : 6, timeName : '18:30' },
                {timeId : 7, timeName : '18:45' },
                {timeId : 8, timeName : '19:00' },
                {timeId : 9, timeName : '19:15' },
                {timeId : 10, timeName : '19:30' },
                {timeId : 11, timeName : '19:45' },
                {timeId : 12, timeName : '20:00' },
                {timeId : 13, timeName : '20:15' },
                {timeId : 14, timeName : '20:30' },
                {timeId : 15, timeName : '20:45' },
                {timeId : 16, timeName : '21:00' },
                {timeId : 17, timeName : '21:15' },
                {timeId : 18, timeName : '21:30' },
                {timeId : 19, timeName : '21:45' },
                {timeId : 20, timeName : '22:00' },
                {timeId : 21, timeName : '22:15' },
                {timeId : 22, timeName : '22:30' },
                {timeId : 23, timeName : '22:45' },
                {timeId : 24, timeName : '23:00' },
                {timeId : 25, timeName : '23:15' },
                {timeId : 26, timeName : '23:30' },
                {timeId : 27, timeName : '23:45' },
                {timeId : 28, timeName : '00:00' }
            ];
            return times;
        },

        getMorningTimes : function(){
            morningTimes = [
                {timeId : 0, timeName : '07:00' },
                {timeId : 1, timeName : '07:15' },
                {timeId : 2, timeName : '07:30' },
                {timeId : 3, timeName : '07:45' },
                {timeId : 4, timeName : '08:00' },
                {timeId : 5, timeName : '08:15' },
                {timeId : 6, timeName : '08:30' },
                {timeId : 7, timeName : '08:45' },
                {timeId : 8, timeName : '09:00' },
                {timeId : 9, timeName : '09:15' },
                {timeId : 10, timeName : '09:30' },
                {timeId : 11, timeName : '09:45' },
                {timeId : 12, timeName : '10:00' },
                {timeId : 13, timeName : '10:15' },
                {timeId : 14, timeName : '10:30' },
                {timeId : 15, timeName : '10:45' },
                {timeId : 16, timeName : '11:00' },
                {timeId : 17, timeName : '11:15' },
                {timeId : 18, timeName : '11:30' },
                {timeId : 19, timeName : '11:45' },
                {timeId : 20, timeName : '12:00' },
                {timeId : 21, timeName : '12:15' },
                {timeId : 22, timeName : '12:30' },
                {timeId : 23, timeName : '12:45' },
                {timeId : 24, timeName : '13:00' },
                {timeId : 25, timeName : '13:15' },
                {timeId : 26, timeName : '13:30' },
                {timeId : 27, timeName : '13:45' },
                {timeId : 28, timeName : '14:00' }
            ];
            return morningTimes;
        },

        getRecurringOptions : function(){
            recurrings = [
                {recurringId: 0, recurringName:'Not recurring'},
                {recurringId: 1,recurringName:'Weekly'}
            ];
            return recurrings
        }

};

