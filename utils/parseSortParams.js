const sortOrderList = ['asc', 'desc'];

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : 'asc';
  const parsedSortBy = typeof sortBy === 'string' && sortBy.trim() !== '' ? sortBy : 'name';

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
