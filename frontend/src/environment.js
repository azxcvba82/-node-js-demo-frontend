// displays a page header

export const environment =  {
  production : {
    apiEndpoint: "https://app-express-nodejs-demo-backend.azurewebsites.net",
    //apiEndpoint: "http://localhost:80",
    blobStorage:  "https://staticdatahenry.blob.core.windows.net/images/"
  },
  develop : {
    apiEndpoint: "http://localhost:80",
    blobStorage:  "https://staticdatahenry.blob.core.windows.net/images/"
  }
};