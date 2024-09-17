type Filter = {
  [key: string]: string | number;
};

/**
 * Parses a filter string into a where condition object that can be used by Prisma.
 *
 * The filter string should be a JSON object with the following format:
 * {
 *   key1: value1,
 *   key2: value2,
 *   ...
 * }
 *
 * If the value is a string, it will be converted to a contains filter with case insensitive mode.
 * If the value is a number, it will be converted to an equals filter.
 *
 * If the filter string is invalid, it will throw an error.
 *
 * @param filters The filter string to parse.
 * @returns A where condition object that can be used by Prisma.
 * @throws If the filter string is invalid.
 */
const parseFilters = (filters: string | undefined) => {
  let whereConditions: Filter = {};

  if (filters) {
    try {
      const parsedFilters = JSON.parse(filters);

      whereConditions = Object.keys(parsedFilters).reduce((conditions, key) => {
        const value = parsedFilters[key];

        if (typeof value === "string") {
          conditions[key] = {
            contains: value,
            mode: "insensitive",
          };
        } else if (typeof value === "number") {
          conditions[key] = {
            equals: value,
          };
        }
        return conditions;
      }, {} as any);
    } catch (error: Error | any) {
      throw new Error(
        error.message || "Invalid filter format. Please provide valid JSON."
      );
    }
  }

  return whereConditions;
};

export default parseFilters;
