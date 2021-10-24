export const fetchData = async (url: string): Promise<any> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': '04aa6ee496msh844f073e6a9af8dp19a38ajsn9b8d1df10a77',
    },
  });
  const data = await res.json();
  return data;
};
