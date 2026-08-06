export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = ['work', 'home', 'personal'].includes(type)
    ? type
    : undefined;

  let parsedIsFavourite;
  if (isFavourite === 'true') {
    parsedIsFavourite = true;
  } else if (isFavourite === 'false') {
    parsedIsFavourite = false;
  }

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
