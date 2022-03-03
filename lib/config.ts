const config:any = {};

config.endpoint = process.env.AZURE_URI;
config.key =  process.env.PRM_KEY;
config.database = "Urllist";
config.container = "urls";

export default config;