type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassDictionary = Record<string, any>;
type ClassArgument = ClassValue | ClassArray | ClassDictionary;

export function cn(...inputs: ClassArgument[]): string {
  const classes = inputs.filter(Boolean);
  return classes.join(' ');
}