export function getEnumFromValue<
  TEnum extends Record<any, TEnumValue>,
  TEnumValue
>(enumObject: TEnum, targetEnumValue: TEnumValue | null): TEnum[keyof TEnum] {
  const key: keyof TEnum | undefined = Object.keys(enumObject).find(
    (k) => enumObject[k] === targetEnumValue
  );

  if (!key) {
    throw new Error(`Invalid enum value`);
  }

  return enumObject[key];
}
