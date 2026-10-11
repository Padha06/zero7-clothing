type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function toVal(mix: ClassValue): string {
  let str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object" && mix !== null) {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        const inner = toVal(item);
        if (inner) str && (str += " ");
        str += inner;
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          str && (str += " ");
          str += key;
        }
      }
    }
  }
  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  return inputs.map(toVal).filter(Boolean).join(" ");
}

export type { ClassValue };
