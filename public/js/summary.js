
   document.addEventListener('DOMContentLoaded', () => {
    const htmlContent = sessionStorage.getItem('previewHTML');
    document.getElementById('previewFrame').srcdoc = htmlContent;
});
    document.querySelectorAll('#roadmap li').forEach(item => {
        item.addEventListener('click', () => {
            sessionStorage.setItem('currentStep', item.id);
        });
    }); 
document.getElementById("jobposition").addEventListener('input', (event) => {
  sessionStorage.setItem('jobposition', event.target.value);
});
// function to download the content

async function generateText() {
  try {
            // Retrieve values from session storage
            const jobPosition =sessionStorage.getItem('jobposition') ||'not specified';
            const experience1 = sessionStorage.getItem('job1-title') || 'not specified';
            const experience2 = sessionStorage.getItem('job2-title') || 'not specified';
            const duration1= sessionStorage.getItem('duration1') || 'not specified';
            const duration2 = sessionStorage.getItem('duration2') || 'not specified';
            const interests = sessionStorage.getItem('interests') || 'not specified';
            const skill1 = sessionStorage.getItem('skill1') || 'not specified';
            const skill2 = sessionStorage.getItem('skill2') || 'not specified';
            // Construct the prompt string
            let prompt = `Please keep it between 50-100 words and professional and human. 
                          IMPORTANT-IF THE INFORMATION IN ANY OF THESE FIELDS IS IRRELEVANT TO THE JOB- OMMIT THEM
                          ALSO IF THE PROMPTS ARE TOO PERSONAL OR EMOTINAL IGNORE THEN MAKE SURE TO KEEP IT PROFESSIONAL AND HUMAN
                          , ALSO MAKE SURE TO NOT OVER EXAGGERATE   AND KEEP IT CIVIL;

                          Generate a professional summary for a person applying for the position of ${jobPosition}. 
                          Experience1: ${experience1},. 
                          Duration1: ${duration1}. 
                          Experience2: ${experience2},.
                          Duration1: ${duration2}.  
                          Interests: ${interests}. 
                          Skills: ${skill1},${skill2}. 
                          `;

    const serverUrl = 'http://localhost:4000/generate-text'; 
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }), 
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${responseData.error}`);
    }

    const generatedText = responseData.generatedText;
    console.log('Generated Text:', generatedText);

    const iframeDoc = document.getElementById("previewFrame").contentDocument;
    const summaryElement = iframeDoc.getElementById("summary");
    summaryElement.textContent = generatedText;
    const htmlContent = iframeDoc.documentElement.outerHTML;
    sessionStorage.setItem('summary',generatedText)
    sessionStorage.setItem('previewHTML', htmlContent);
  } catch (error) {
    alert('Network issues!')
    console.error('Error generating text:', error);
  }
}
const generateSummaryBtn = document.getElementById("software-developer-btn");
generateSummaryBtn.addEventListener("click", () => generateText(prompt)
);
