document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-experience");
  const additionalExperience = document.getElementById("additional-experience");

  if (toggleButton && additionalExperience) {
    toggleButton.addEventListener("click", () => {
      if (additionalExperience.classList.contains("hidden")) {
        additionalExperience.classList.remove("hidden");
        toggleButton.textContent = "Show Less";
      } else {
        additionalExperience.classList.add("hidden");
        toggleButton.textContent = "Show More";
      }
    });
  }

  const recruiterForm = document.getElementById("recruiter-form");
  const nameInput = document.getElementById("recruiterName");
  const emailInput = document.getElementById("recruiterEmail");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formSuccess = document.getElementById("form-success");

  if (recruiterForm) {
    recruiterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";
      formSuccess.classList.remove("success-message");

      let isValid = true;

      if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required.";
        isValid = false;
      }

      if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (messageInput.value.trim() === "") {
        messageError.textContent = "Message cannot be empty.";
        isValid = false;
      }

      if (isValid) {
        console.log("Form Submitted Successfully!");
        console.log("Name:", nameInput.value.trim());
        console.log("Email:", emailInput.value.trim());
        console.log("Message:", messageInput.value.trim());

        formSuccess.textContent =
          "Thank you for your message! We will get back to you soon.";
        formSuccess.classList.add("success-message");

        recruiterForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
