export const getDateRange = () => {
  const today = new Date();

  const todayFormatted = formatDate(today);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7);

  const seasonEnd = new Date(today);
  seasonEnd.setDate(today.getDate() + 90);

  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 7);

  const futureFormatted = formatDate(futureDate);
  const pastFormatted = formatDate(pastDate);
  const seasonEndFormatted = formatDate(seasonEnd);

  return { today: todayFormatted, future: futureFormatted, past: pastFormatted, seasonEnd: seasonEndFormatted };
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  return `${year}-${month}-${day}`;
};
