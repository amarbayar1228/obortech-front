import axios from "axios";
async function SlugPost(slug, data, headers, aa) {
  console.log("slug: ", slug);
    // console.log("data: ", data);   
    // console.log("headers: ", headers);
    // console.log("aa: ", aa);
  return new Promise((resolve, reject) => {
      var username = 'SMARTHUB_ECOSYS';
      var password = 'z7l1nSmZ'; 
    const token = `${username}:${password}` 
    const basicAuth = Buffer.from(token).toString('base64');
    if(data.login === "login"){
       
       // Qpay Login token awah
    axios.post(`${"https://merchant.qpay.mn/v2/auth"}/${slug}`,data,
    {
      headers: {
          'Authorization': "Basic " + basicAuth
      },
       
    }
  ).then((result) => {resolve(result)},(error) => {reject(error)});
        
    } else if(data.invoice_code === "SMARTHUB_ECOSYS_INVOICE"){
       // Qpay simpleInvoice vvsgeh qr awah
    axios.post(`${"https://merchant.qpay.mn/v2"}/${slug}`,data,
    { 
      
      headers: { 
      "ContentType": "application/json", 
      'Authorization': headers.authorization}
    }
  ).then((result) => {resolve(result)},(error) => {reject(error)});
    }
   
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
