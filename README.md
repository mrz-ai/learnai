[![Netlify Status](https://api.netlify.com/api/v1/badges/82e54673-00dc-422c-b501-b5132fdae6de/deploy-status)](https://app.netlify.com/sites/learnai-app/deploys)
# Learnai App with OpenAI API for Semantic Search

This repository contains a Next.js 13 application that allows users to perform semantic searches using the OpenAI API. The app is built using TypeScript and styled using a combination of Tailwind and DaisyUI.



## Setup

To get started with this application, you will first need to clone the repository to your local machine. Once you have done that, navigate to the project directory and run the following command to install the required dependencies:

```bash
  npm install
```
You will also need to set up your OpenAI API credentials in a .env.local file in the root of the project. The file should look something like this:

```bash
  OPENAI_API_KEY=your-api-key-here
```
To start the application in development mode, run the following command:

```bash
  npm run dev
```
The application should be available at http://localhost:3000.




## Usage

To use the application, simply enter a query into the search box on the home page and hit enter. The application will use the OpenAI API to generate a set of suggested questions and keywords based on your query. You can click on any of the suggested questions or keywords to learn more about that subject.

## Credits

This application was created using the GPT-3.5-Turbo model from OpenAI. The project also uses Tailwind and DaisyUI for styling.
## License

This project is licensed under the MIT License. Please see the [MIT License](https://choosealicense.com/licenses/mit/) file for more information.



## Authors

- [@githubmor](https://github.com/githubmor)

