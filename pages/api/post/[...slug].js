import axios from "axios";

async function SlugPost(slug, data) {
  
  console.log("URL=============> : ", process.env.URL);
  // console.log("data ============> ", slug);
  // console.log("URL:   ", process.env.URL + "/" + slug);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMzc1MzQ3LCJleHAiOjE2NDM5NjczNDd9.lJd-Xx-b2kHPsBxatVfxqSRBC4Isw8_oV5jViuhsthw";

  return new Promise((resolve, reject) => {
    // console.log("URL: -> " + `${process.env.URL}/${slug}`);
    
    axios.post(
        `${process.env.URL}/${slug}`,
        data,
        // {
        //   // headers: {
        //   //   Accept: "application/json",
        //   //   ContentType: "application/json",
        //   //   Authorization:
        //   //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMzc1MzQ3LCJleHAiOjE2NDM5NjczNDd9.lJd-Xx-b2kHPsBxatVfxqSRBC4Isw8_oV5jViuhsthw",
        //   // },
        //   api: {
        //     bodyParser: {
        //         sizeLimit: false,
        //     }
        //   }
        // }
      )
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
export default async function handler(req, res) {
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body).then(
    function (response) {
      res.status(200).json(response.data);
    },
    function (error) {
      console.log(error);
    }
  );
}
