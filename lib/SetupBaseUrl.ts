export const setUpBaseUrl = () => {
    return  process.env.NODE_ENV === 'development' ? process.env.DEV_ORIGIN : process.env.PROD_ORIGIN
}