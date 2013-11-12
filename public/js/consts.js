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
                {Id : 0, timeName : '17:00' },
                {Id : 1, timeName : '17:15' },
                {Id : 2, timeName : '17:30' },
                {Id : 3, timeName : '17:45' },
                {Id : 4, timeName : '18:00' },
                {Id : 5, timeName : '18:15' },
                {Id : 6, timeName : '18:30' },
                {Id : 7, timeName : '18:45' },
                {Id : 8, timeName : '19:00' },
                {Id : 9, timeName : '19:15' },
                {Id : 10, timeName : '19:30' },
                {Id : 11, timeName : '19:45' },
                {Id : 12, timeName : '20:00' },
                {Id : 13, timeName : '20:15' },
                {Id : 14, timeName : '20:30' },
                {Id : 15, timeName : '20:45' },
                {Id : 16, timeName : '21:00' },
                {Id : 17, timeName : '21:15' },
                {Id : 18, timeName : '21:30' },
                {Id : 19, timeName : '21:45' },
                {Id : 20, timeName : '22:00' },
                {Id : 21, timeName : '22:15' },
                {Id : 22, timeName : '22:30' },
                {Id : 23, timeName : '22:45' },
                {Id : 24, timeName : '23:00' },
                {Id : 25, timeName : '23:15' },
                {Id : 26, timeName : '23:30' },
                {Id : 27, timeName : '23:45' },
                {Id : 28, timeName : '00:00' }
            ];
            return times;
        },

    getEveningTimeFromIndex :function(index){
        allEveningTimes = this.getEveningTimes();
        val = 0;
        allEveningTimes.forEach(function(time){

            debugger;
           if(time.Id == parseInt(index)){
               val = time.timeName;
           }
        });
        return val;
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

    getMorningTimeFromIndex :function(index){
        allMorningTimes = getMorningTimes();
        allMorningTimes.forEach(function(time){
            if(time.timeId == index){
                return time.timeName;
            }
        });
    },

        getRecurringOptions : function(){
            recurrings = [
                {recurringId: 0, recurringName:'Not recurring'},
                {recurringId: 1,recurringName:'Weekly'}
            ];
            return recurrings
        }

};

