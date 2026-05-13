const calculateStreaks = async(logs, frequency) => {
    let currentStreak = 0
    let maxStreak = 0
    let prevDate = null

    for (let log of logs){
        const currDate = new Date(log.date)
        if(!prevDate){
            currentStreak = 1;
        }
        else{
            const diffinDays = (currDate-prevDate)/(1000*60*60*24)
            let isConsecutive = false

            if(frequency == "DAILY"){
                isConsecutive = diffinDays === 1
            }
            else if(frequency == "WEEKLY"){
                isConsecutive = diffinDays <= 7
            }
            else if(frequency == "MONTHLY"){
                let prevMonth = prevDate.getUTCMonth();
                let currMonth = prevDate.getUTCMonth();
                let prevYear = prevDate.getUTCFullYear();
                let currYear = prevDate.getUTCFullYear();

                isConsecutive = (prevYear === currYear && currMonth === prevMonth+1) || (prevYear+1 === currYear && prevMonth === 11 && currMonth === 0)
            }
        }

        if(isConsecutive){
            currentStreak++;
        }else{
            currentStreak = 1
        }
        maxStreak = Math.max(currentStreak,maxStreak)
        prevDate = currDate
    }
    return{
        currentStreak, maxStreak
    }
}

export default calculateStreaks;