export const transformRegionsData = (regions) => {
  const namesOfRegions = Object.keys(regions);
  let years = [];
  const values = {};
  const rows = [];

  for (const name of namesOfRegions) {
    years.push(...Object.keys(regions[name]['G']));
  }
  years = [...new Set(years)];

  for (const name of namesOfRegions) {
    for (const year of years) {
      const value = regions[name]['G'][year]
        ? {
            [year]: [
              regions[name]['G'][year]['XX'].value,
              regions[name]['G'][year]['YY'].value,
              regions[name]['G'][year]['ZZ'].value,
            ],
          }
        : { [year]: ['-', '-', '-'] };
      values[name] = { ...values[name], ...value };
    }
  }

  for (const name of namesOfRegions) {
    rows.push({
      regionName: name,
      ...values[name],
    });
  }

  return { rows, years, namesOfRegions };
};

export const formatDate = (date) => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
    date
  );
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${day}.${month}.${year}`;
};
