const calculateStreaks = (logs, frequency) => {
  let currentStreak = 0;
  let maxStreak = 0;
  let prevDate = null;

  for (let log of logs) {
    const currDate = new Date(log.date);

    let isConsecutive = false;

    if (!prevDate) {
      currentStreak = 1;
    } else {
      const diffInDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (frequency === "DAILY") {
        isConsecutive = diffInDays === 1;
      } else if (frequency === "WEEKLY") {
        isConsecutive = diffInDays <= 7;
      } else if (frequency === "MONTHLY") {
        const prevMonth = prevDate.getUTCMonth();
        const currMonth = currDate.getUTCMonth();

        const prevYear = prevDate.getUTCFullYear();
        const currYear = currDate.getUTCFullYear();

        isConsecutive =
          (prevYear === currYear && currMonth === prevMonth + 1) ||
          (prevYear + 1 === currYear && prevMonth === 11 && currMonth === 0);
      }

      if (isConsecutive) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }

    maxStreak = Math.max(currentStreak, maxStreak);

    prevDate = currDate;
  }

  return {
    currentStreak,
    maxStreak,
  };
};

export default calculateStreaks;
