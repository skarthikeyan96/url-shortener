const config:any = {};

config.endpoint = process.env.AZURE_URI;
config.key =  process.env.PRM_KEY;
config.db = "UrlList";
config.ct = "Items";

export default config;