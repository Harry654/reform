export const isTruthy = (...args: any[]): boolean => {
  return args.every((arg) => {
    if (Array.isArray(arg)) return arg.length > 0;
    return !!arg;
  });
};
