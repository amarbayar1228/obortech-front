import axios from "axios";
async function SlugPost(slug, data, headers) {
    console.log("data: ", data);  
  return new Promise((resolve, reject) => { 
    if(data){
      
      var username = 'TEST_MERCHANT';
      var password = '123456';
    }else{
      var username = 'SMARTHUB_ECOSYS';
      var password = 'z7l1nSmZ';
    }
     
    const token = `${username}:${password}` 
    const basicAuth = Buffer.from(token).toString('base64');
    axios.post(`${"https://merchant-sandbox.qpay.mn/v2/auth"}/${slug}`,data,
        {
          headers: {
              'Authorization': "Basic " + basicAuth
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
      // console.log(error);
    }
  );
}
