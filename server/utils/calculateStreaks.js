const calculateStreaks = (logs, frequency) => {

  if (!logs || logs.length === 0) {
    return {
      currentStreak: 0,
      maxStreak: 0,
    };
  }

  let currentStreak = 0;
  let maxStreak = 0;
  let prevDate = null;

  // normalize + remove duplicates
  const uniqueLogs = [
    ...new Map(
      logs.map((log) => {
        const d = new Date(log.date);

        d.setUTCHours(0, 0, 0, 0);

        return [d.getTime(), { ...log, normalizedDate: d }];
      }),
    ).values(),
  ];

  for (let log of uniqueLogs) {

    const currDate = log.normalizedDate;

    let isConsecutive = false;

    if (!prevDate) {

      currentStreak = 1;

    } else {

      const diffInDays = Math.round(
        (currDate - prevDate) / (1000 * 60 * 60 * 24),
      );

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
          (prevYear + 1 === currYear &&
            prevMonth === 11 &&
            currMonth === 0);
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

  if (!prevDate) {
    return {
      currentStreak: 0,
      maxStreak: 0,
    };
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (frequency === "DAILY") {

    if (prevDate.getTime() !== today.getTime()) {
      currentStreak = 0;
    }

  } else if (frequency === "WEEKLY") {

    const diff = Math.round(
      (today - prevDate) / (1000 * 60 * 60 * 24),
    );

    if (diff > 7) {
      currentStreak = 0;
    }

  } else if (frequency === "MONTHLY") {

    const monthDiff =
      (today.getUTCFullYear() - prevDate.getUTCFullYear()) * 12 +
      (today.getUTCMonth() - prevDate.getUTCMonth());

    if (monthDiff > 1) {
      currentStreak = 0;
    }
  }

  return {
    currentStreak,
    maxStreak,
  };
};

export default calculateStreaks;