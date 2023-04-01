export function formatStringData(input) {
  return typeof input === "string"
    ? input
        .toLocaleLowerCase()
        .split(" ")
        .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
        .join(" ")
    : input;
}
export function formatObjectData(input) {
  let output = input;
  if (input instanceof Object) {
    for (let [key, value] of Object.entries(input)) {
      if (value instanceof Array) {
        output = { ...output, [key]: formatArrayData(value) };
      } else if (value instanceof Object) {
        output = { ...output, [key]: formatObjectData(value) };
      } else {
        output = { ...output, [key]: formatStringData(value) };
      }
    }
  }
  return output;
}
export function formatArrayData(input) {
  let output = input;
  if (input instanceof Array) {
    output = input.map((data) => {
      if (data instanceof Array) {
        return formatArrayData(data);
      }
      if (data instanceof Object) {
        return formatObjectData(data);
      }
      return formatStringData(data);
    });
  }
  return output;
}
