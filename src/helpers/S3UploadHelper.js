const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const S3UploadHelper = {
  uploadFile: async (file) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `fileupload/fda-${Date.now()}-${file.name}`,
      Body: file.data,
      ACL: "public-read",
    };

    const data = await S3.upload(params).promise();
    return data.Location;
  },
};

module.exports = S3UploadHelper;
