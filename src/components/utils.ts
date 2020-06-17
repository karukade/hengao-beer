// todo: pathsでreolveするPromiseのtypeを書きたい
export const preLoadImages = <T extends string[]>(
  paths: T,
  onErr?: (arg: T[number]) => void
): Promise<T[number][]> => {
  return Promise.all<T[number]>(
    paths.map((path) => {
      const img = new Image();
      return new Promise<T[number]>((resolve) => {
        img.onload = () => resolve(path);
        img.onerror = () => onErr && onErr(path);
        img.src = path;
      });
    })
  );
};
