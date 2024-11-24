
  let fname = "", address = "", phone = "", email = "", summary = "", degreeName = "", schoolName = "", graduationYear = "", jobTitle = "", companyName1 = "", duration1 = "", endDate = "", responsibilities = "", skills = "", accolades = "";
  

  document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const templateId = urlParams.get('template');
      const formId = urlParams.get('form');
      if (templateId) {
        const iframe = document.getElementById('previewFrame');
        iframe.src = `template_${templateId}.html`;
        
        iframe.onload = () => {
            // Populate the new template with existing session storage data
            if (sessionStorage.length > 0) {
                populatePreviewFromSession();
            }
        };
    } else {
        console.error('No template ID provided in the URL');
    }
       

    const iframe = document.getElementById("previewFrame");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const htmlContent = sessionStorage.getItem('previewHTML');
      const currentStep = sessionStorage.getItem('currentStep') || 'choose-template';
      if (htmlContent) {
          document.getElementById('previewFrame').srcdoc = htmlContent;
          loadRoadmapStep(currentStep);
      }
  });

  function populatePreviewFromSession() {
    const iframe = document.getElementById("previewFrame");
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    Object.keys(sessionStorage).forEach(key => {
        if (key !== 'previewHTML' && key !== 'currentStep') {
            const value = sessionStorage.getItem(key);
            const previewElement = iframeDocument.getElementById(key);
            if (previewElement) {
                previewElement.textContent = value;
            }
        }
    });

    const htmlContent = iframeDocument.documentElement.outerHTML;
    sessionStorage.setItem('previewHTML', htmlContent);
}

  document.getElementById("form-column").addEventListener('input', (event) => {
      if (event.target.tagName === 'INPUT') {
          updatePreview(event.target.id);
          const step = sessionStorage.getItem('currentStep') || 'choose-template';
          updateSessionData(step, event.target.id, event.target.value);
      }
  });
  
  function updatePreview(targetId) {
      const value = document.getElementById(targetId).value;
      // Access the iframe document
      const iframe = document.getElementById("previewFrame");
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
      switch (targetId) {
    case "fname":
      iframeDocument.getElementById("fname").textContent = value;
      sessionStorage.setItem("fname", value);
      break;
    case "phone":
      iframeDocument.getElementById("phone").textContent = value;
      sessionStorage.setItem("phone", value);
      break;
    case "email":
      iframeDocument.getElementById("email").textContent = value;
      sessionStorage.setItem("email", value);
      break;
    case "interests":
      iframeDocument.getElementById("interests").textContent = value;
      sessionStorage.setItem("interests", value);
      break;
    case "schoolName":
      iframeDocument.getElementById("schoolName").textContent = value;
      sessionStorage.setItem("schoolName", value);
      break;
    case "schoolyear":
      iframeDocument.getElementById("schoolyear").textContent = value;
      sessionStorage.setItem("schoolyear", value);
      break;
    case "collegeName":
      iframeDocument.getElementById("collegeName").textContent = value;
      sessionStorage.setItem("collegeName", value);
      break;
    case "degreeName":
      iframeDocument.getElementById("degreeName").textContent = value;
      sessionStorage.setItem("degreeName", value);
      break;
    case "graduationYear":
      iframeDocument.getElementById("graduationYear").textContent = value;
      sessionStorage.setItem("graduationYear", value);
      break;
    case "job1-title":
      iframeDocument.getElementById("job1-title").textContent = value;
      sessionStorage.setItem("job1-title", value); 
      break;
    case "companyName1":
      iframeDocument.getElementById("companyName1").textContent = value;
      sessionStorage.setItem("companyName1", value);
      break;
    case "duration1":
      iframeDocument.getElementById("duration1").textContent = value;
      sessionStorage.setItem("duration1", value);
      break;
    case "responsibilities1":
      iframeDocument.getElementById("responsibilities1").textContent = value;
      sessionStorage.setItem("responsibilities1", value);
      break;
    case "job2-title":
      iframeDocument.getElementById("job2-title").textContent = value;
      sessionStorage.setItem("job2-title", value); 
      break;
    case "companyName2":
      iframeDocument.getElementById("companyName2").textContent = value;
      sessionStorage.setItem("companyName2", value);
      break;
    case "duration2":
      iframeDocument.getElementById("duration2").textContent = value;
      sessionStorage.setItem("duration2", value);
      break;
    case "responsibilities2":
      iframeDocument.getElementById("responsibilities2").textContent = value;
      sessionStorage.setItem("responsibilities2", value);
      break;
    case "skill1":
      iframeDocument.getElementById("skill1").textContent = value;
      sessionStorage.setItem("skill1", value);
      break;
    case "skill2":
      iframeDocument.getElementById("skill2").textContent = value;
      sessionStorage.setItem("skill2", value);
      break;
          default:
              console.warn(`No matching element found in preview for ID: ${targetId}`);
      }
     
      const htmlContent = iframeDocument.documentElement.outerHTML;
      sessionStorage.setItem('previewHTML', htmlContent);
  }
  
  function loadRoadmapStep(step) {
      sessionStorage.setItem('currentStep', step);
      const formColumn = document.getElementById("form-column");
      
      if (forms[step]) {
          formColumn.innerHTML = forms[step];
  
          // Populate form fields with session data
          const sessionData = getSessionData(step);
          if (sessionData) {
              Object.keys(sessionData).forEach(key => {
                  const input = document.getElementById(key);
                  if (input) {
                      input.value = sessionData[key];
                  }
              });
          }
      }
  }
  
  function getSessionData(step) {
      const storedData = sessionStorage.getItem(step);
      return storedData ? JSON.parse(storedData) : null;
  }
  
  function updateSessionData(step, key, value) {
      const sessionData = getSessionData(step) || {};
      sessionData[key] = value;
      sessionStorage.setItem(step, JSON.stringify(sessionData));
  }
  
  document.getElementById("roadmap").addEventListener("click", (event) => {
      if (event.target.tagName === "LI" || event.target.tagName === "SPAN") {
          const step = event.target.textContent.toLowerCase().replace(' ', '-');
          loadRoadmapStep(step);
      }
  });
  function convertHTMLToPDF() {
            const iframe = document.getElementById('previewFrame');
            const iframeWindow = iframe.contentWindow;
            iframeWindow.print();
        }

  