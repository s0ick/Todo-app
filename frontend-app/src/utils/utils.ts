export const uuid = () => {
  const mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  let dt = new Date().getTime();

  return mask.replace(/[xy]/g, c => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
};
