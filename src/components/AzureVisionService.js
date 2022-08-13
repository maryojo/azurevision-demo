// ./scr/components/AzureVisionService

// Importing the Azure SDK client libraries
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

// Authentication requirements
const key = process.env.REACT_APP_apiKey;
const endpoint = process.env.REACT_APP_endPoint;

// Cognitive service features
const options = {
    maxCandidates: 5,
    language: "en"
  };


// Analyze Image from URL
export const computerVision = async (url) => {

    // authenticate to Azure service
    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
    
    // analyze image
    const analysis = await computerVisionClient.describeImage(url, options)
    .then((result) => {
        console.log("The result is:");
        console.log(result);
        return { "URL": url, ...result};
      })
      .catch((err) => {
        console.log("An error occurred:");
        console.error(err);
        alert(err + "Upload an image with a smaller size");
      });

    // all information about image
    console.log("This is:" +analysis);
    if(analysis === undefined){
        return "There is something wrong with the image"
    }
    return { "URL": url, ...analysis};
}
