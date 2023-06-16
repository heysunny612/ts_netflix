export default function makeImgPath(imgUrl: string, format = 'original') {
  return `https://image.tmdb.org/t/p/${format}/${imgUrl}`;
}
