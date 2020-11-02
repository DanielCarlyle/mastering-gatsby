import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

//to see if the token and env file are working
//console.log(process.env.SANITY_TOKEN);

module.exports = {
  pathPrefix: '/pizza',
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton, ON, Canada!',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'xr9t72f8',
        dataset: 'production',
        watchMode: true,
        token: process.env.GATSBY_SANITY_TOKEN,
      },
    },
  ],
};
