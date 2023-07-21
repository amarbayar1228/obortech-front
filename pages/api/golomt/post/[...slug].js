
      
       
import axios from "axios";
async function SlugPost(slug, data, headers, aa) {
  return new Promise((resolve, reject) => { 
    axios.post(`${process.env.GOLOMTURL}/${slug}`,data,
    {
      // ene token n GOlOMT banknaas ugsun token static - aar ugsn
      headers: {
          'Authorization': "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNRVJDSEFOVF9PQkVSVEVDSF9NT05HT0xJQV9MTEMiLCJpYXQiOjE2ODk4MTczMTJ9.w0-Q3XLnvLZss1fN9fVIjEkma28_D2VL-i2SgXNwUrw"
      },
    }
    ).then((result) => {resolve(result)},(error) => {reject(error)}); 
   
  });
}
export const config = {api: {bodyParser: {sizeLimit: '1mb'}}}
export default async function handler(req, res) {
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body).then(
    function (response) {
      res.status(200).json(response.data);
    },
    function (error) {
      res.status(200).json(error.data);
    }
  );
}

