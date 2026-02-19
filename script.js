const canvas = document.getElementById("resume-canvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

const resumeData = {
    // PASTE YOUR EXTRACTED RESUME TEXT HERE
    content: "Full Name: [Name]... Experience: [Details]..." 
};

// Canvas Drawing Logic
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const updateImage = index => {
  if (images[index]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
  }
};

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

// Chatbot Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messagesDiv = document.getElementById('chat-messages');

chatToggle.onclick = () => chatWindow.classList.toggle('hidden');

async function askAI(question) {
    // SYSTEM PROMPT FOR GEMINI
    const systemPrompt = `You are a Resume Assistant. You MUST ONLY answer questions using the provided resume details: ${resumeData.content}. If the answer is not in the resume, politely say you don't have that information. Keep answers concise.`;

    // Simulated API Call - Replace with your Gemini API Endpoint
    // const response = await fetch('YOUR_GEMINI_API_ENDPOINT', { ... });
    
    return "This is a simulated response based on the resume data.";
}

sendBtn.onclick = async () => {
    const text = userInput.value;
    if(!text) return;

    messagesDiv.innerHTML += `<div><b>You:</b> ${text}</div>`;
    userInput.value = '';

    const aiRes = await askAI(text);
    messagesDiv.innerHTML += `<div><b>AI:</b> ${aiRes}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Initial Frame
images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
const html = document.documentElement;
