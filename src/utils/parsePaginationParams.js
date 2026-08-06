export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseInt(page);
  const parsedPerPage = parseInt(perPage);

  const parsedPageResult =
    Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;
  const parsedPerPageResult =
    Number.isNaN(parsedPerPage) || parsedPerPage <= 0 ? 10 : parsedPerPage;

  return {
    page: parsedPageResult,
    perPage: parsedPerPageResult,
  };
};
