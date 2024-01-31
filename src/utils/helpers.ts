export const preperedColor = (color: string | undefined) => {
  let modifiedColor = color;

  if (modifiedColor) {
    modifiedColor = modifiedColor.length === 1
      ? modifiedColor
      : modifiedColor.replace(' ', '-');
  }

  return modifiedColor;
};
