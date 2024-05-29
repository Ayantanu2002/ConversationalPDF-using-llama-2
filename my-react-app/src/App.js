import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'; // Update the import path if necessary

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingAnswer, setLoadingAnswer] = useState(false); // New loading state
  const [wordCount, setWordCount] = useState(0); // Track word count
  const [combinedWordCount, setCombinedWordCount] = useState(0); // Track combined word count
  const [quota, setQuota] = useState(10000); // Set quota limit

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('isLoggedIn');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Simulate successful login for any input
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true); // Store login state in localStorage
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage on logout
  };

  const handleQuestionChange = (e) => {
    const text = e.target.value;
    setQuestion(text);
    setWordCount(countWords(text));
    setCombinedWordCount(wordCount + countWords(answer));
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const fetchPdfFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pdf-files');
      setPdfFiles(response.data);
    } catch (error) {
      console.error('Error fetching PDF files:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chat-history');
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleInitializeAndAsk = async () => {
    try {
      // Initialize PDFChatBot
      const initResponse = await axios.post('http://localhost:5000/initialize');
      console.log(initResponse.data.message);
  
      // Ask the question
      setLoadingAnswer(true); // Set loading state to true while fetching answer
      const askResponse = await axios.post('http://localhost:5000/ask', { question });
      const answerText = askResponse.data.answer;
      const newCombinedWordCount = countWords(question) + countWords(answerText); // Calculate total word count
  
      // Check if combined word count exceeds quota
      if (newCombinedWordCount > quota) {
        setAnswer('Quota exceeded. Please try the question in different way.....🙏');
        setLoadingAnswer(false); // Set loading state to false if the quota is exceeded
        return; // Exit the function early if the quota is exceeded
      }
  
      // If quota is not exceeded, update the state with the new combined word count
      setAnswer(answerText);
      setCombinedWordCount(newCombinedWordCount);
      setLoadingAnswer(false); // Set loading state to false after receiving answer
  
      fetchChatHistory(); // Fetch chat history after asking a question
    } catch (error) {
      console.error('Error initializing PDFChatBot or asking question:', error);
      setAnswer('Error initializing PDFChatBot or asking question. Please try again.');
      setLoadingAnswer(false); // Set loading state to false if there's an error
    }
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);
      fetchPdfFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleRemovePdf = async (pdfFile) => {
    try {
      // Extract the file name from the full file path
      const fileName = pdfFile.split('/').pop();
      
      const response = await axios.delete(`http://localhost:5000/remove-pdf/${fileName}`);
      console.log(response.data.message);
      fetchPdfFiles(); // Refresh PDF files after removing entry
    } catch (error) {
      console.error('Error removing PDF file:', error);
    }
  };

  const handleRemoveHistory = async (historyId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/remove-history/${historyId}`);
      console.log(response.data.message);
      fetchChatHistory(); // Refresh chat history after removing entry
    } catch (error) {
      console.error('Error removing chat history:', error);
    }
  };

  const handleShowAnswer = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:5000/chat-history/${questionId}`);
      const updatedChatHistory = chatHistory.map((chat) => {
        if (chat.id === questionId) {
          return { ...chat, answer: response.data.answer };
        }
        return chat;
      });
      setChatHistory(updatedChatHistory);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  // Render the login form if the user is not logged in
  if (!isLoggedIn) {
    return (
      <LoginForm 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin} 
      />
    );
  }

  return (
    
    <div className="App">
      <div>
      <h1 className="welcome-message">Welcome, {username} 🤖</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      
     
                  
                  <div className="chat-section">
                    <h2>Chat History 📜 </h2>
                    <ul>
                      {chatHistory.map((chat) => (
                        <li key={chat.id}>
                          <p>Question: {chat.query}</p>
                          <p>Answer: {chat.answer}</p>
                          <button onClick={() => handleRemoveHistory(chat.id)}>Remove</button>
                          {/* <button onClick={() => handleShowAnswer(chat.id)}>Show Answer</button> */}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="upload-section">
        <h2>PDF Files 📚</h2>
        <input type="file" onChange={
                    handleFileUpload} />
                    <button onClick={handleUpload}>Upload</button>
                    <ul>
                      {pdfFiles.map((pdfFile, index) => (
                        <li key={index}>
                          <span>{pdfFile}</span>
                          <button onClick={() => handleRemovePdf(pdfFile)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="quota-section">
                    <div className='quota'>
                      <h4>Quota</h4>
                      <p>{combinedWordCount}/{quota}</p>
                    </div>
                    <div className="input-container">
                      <h4>Ask your question here: 💡</h4>
                      <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Enter your question..."
                      />
                      <div className="button-container">
                        <button onClick={handleInitializeAndAsk}>Ask</button>
                        {loadingAnswer ? <p>Loading answer...</p> : <p>Answer: {answer}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            export default App;
            
