const monthComps = {};

// Calendar data
export const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const today = new Date();
export const todayComps = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
};

// Days/month/year components for a given month and year
export const getMonthComps = (month, year) => {
  const key = `${month}.${year}`;
  let comps = monthComps[key];
  if (!comps) {
    const firstDayOfWeek = 1;
    const inLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const firstWeekday = new Date(year, month - 1, 1).getDay() + 1;
    const days = (month === 2 && inLeapYear) ? 29 : daysInMonths[month - 1];
    const weeks = Math.ceil((days + Math.abs(firstWeekday - firstDayOfWeek)) / 7);
    comps = {
      firstDayOfWeek,
      inLeapYear,
      firstWeekday,
      days,
      weeks,
      month,
      year,
    };
    monthComps[key] = comps;
  }
  return comps;
};

// Days/month/year components for today's month
export const getThisMonthComps = () => getMonthComps(todayComps.month, todayComps.year);

// Day/month/year components for previous month
export const getPrevMonthComps = (month, year) => {
  if (month === 1) return getMonthComps(12, year - 1);
  return getMonthComps(month - 1, year);
};

// Day/month/year components for next month
export const getNextMonthComps = (month, year) => {
  if (month === 12) return getMonthComps(1, year + 1);
  return getMonthComps(month + 1, year);
};

export const getExampleMonthComps = () => {
  const thisMonthComps = getThisMonthComps();
  const nextMonthComps = getNextMonthComps(thisMonthComps.month, thisMonthComps.year);

  return {
    thisMonth: thisMonthComps.month - 1,
    thisMonthYear: thisMonthComps.year,
    nextMonth: nextMonthComps.month - 1,
    nextMonthYear: nextMonthComps.year,
  };
};
