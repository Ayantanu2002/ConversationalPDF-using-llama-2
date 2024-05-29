# PDF Chatbot Project

Welcome to the PDF Chatbot project! This repository contains code and resources for building and deploying a chatbot capable of interacting with PDF documents. This project is created using llama-2-7b-chat.ggmlv3.q8_0 model. For frontend i used React Js for backend i used python flask server.

## Project Overview

This project aims to create a chatbot capable of processing and providing information from PDF documents. The chatbot utilizes natural language processing techniques to understand user queries and extract relevant information from PDF files. Here You can also see the search history. The quota functionality is also available in this project. I am using the MySQL database for storing history and books. 
``` CREATE TABLE books (     id INT AUTO_INCREMENT PRIMARY KEY,     book_path VARCHAR(255),     vector_path VARCHAR(255) );
```
``` CREATE TABLE history (     id INT PRIMARY KEY,     question VARCHAR(255)
NOT NULL,     answer VARCHAR(255) NOT NULL );
```


## Project Structure

The project directory is structured as follows:

- **books:** This directory is intended for storing PDFs or any textual documents related to the project.
  
- **models:** This directory is intended for storing trained machine learning models or pre-trained embeddings. You can get the model from https://www.kaggle.com/datasets/rodrigostallsikora/llama-2-7b-chat-ggmlv3-q8-0-bin. Download the model, please. I am not providing the model. Below I will describe what the directory looks like.
  
- **vector:** This directory is intended for storing vector representations of data, such as word embeddings or other numerical representations.
  
- **my-react-app:** This directory contains the frontend code for a React application that interfaces with the chatbot.
  
- **upload_chatmodel.py:** This script is used to upload trained chatbot models.

## Getting Started

To set up the project on your local machine, follow these steps:

1. Clone the repository to your local machine:
2. Navigate to the root directory of the project:
3. Create the necessary directories by running the following commands in your terminal:
   mkdir books
   mkdir models
   mkdir vector
4. Your directory structure should now look like this:
```
/path/to/PDF-Chatbot/
├── books/
├── models/
├── my-react-app/
├── upload_chatmodel.py
└── vector/
```

6. You can now start using the project. Place PDFs or textual documents in the `books` directory, trained models in the `models` directory, and vector representations in the `vector` directory.

7.
- To train and deploy the chatbot, follow the instructions provided in the respective directories.
- The `my-react-app` directory contains the frontend code for interacting with the chatbot.
- Use `upload_chatmodel.py` to upload trained chatbot models to the repository.
If you want to interact with the chatbot via a web interface:

- Navigate to the `my-react-app` directory.
- Install dependencies:

  ```
  npm install
  ```

- Start the React app:

  ```
  npm start
  ```

This command will start the development server for the React application. Once the server is running, you can access the React app by navigating to `http://localhost:3000` in your web browser.

## Usage

- To train and deploy the chatbot, follow the instructions provided in the respective directories.
- The `my-react-app` directory contains the frontend code for interacting with the chatbot.
- Use `upload_chatmodel.py` to upload trained chatbot models to the repository.

7. So run
```
python3 upload_chatmodel.py
```
and Navigate to the `my-react-app` directory
```
npm start
```









