export const randomNumbers = () => Math.floor(Math.random() * 900) + 100;

export const randomSKU = () => {
  const randomLetters = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  };

  return `${randomLetters()}-${randomNumbers()}-${randomLetters()}`;
};
