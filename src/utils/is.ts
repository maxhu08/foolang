export const isAlphabetic = (value: string) => {
  return value.toUpperCase() !== value.toLowerCase();
};

export const isNumber = (value: string) => {
  const c = value.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];

  return c >= bounds[0] && c <= bounds[1];
};

export const isWhitespace = (value: string) => {
  return value === " " || value === "\n" || value === "\t";
};
