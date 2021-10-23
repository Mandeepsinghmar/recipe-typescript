export const fetchData = async (url: string): Promise<any> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
    },
  });
  const data = await res.json();
  return data;
};
