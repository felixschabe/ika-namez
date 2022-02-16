import fetch from 'node-fetch';

export async function getRandom(max: number): Promise<number> {
  const randomUrl = new URL(
    'https://www.random.org/integers/?num=1&min=0&max=6&col=1&base=10&format=plain&rnd=new'
  );
  randomUrl.searchParams.set('max', max + '');
  const data: string = await fetch(randomUrl.href).then(async data => {
    return await data.text();
  });
  return parseInt(data);
}
