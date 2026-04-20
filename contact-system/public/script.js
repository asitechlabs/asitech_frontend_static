function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
}

async function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  await fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  alert("Message sent successfully!");
}

async function getMessages() {
  try {
    const res = await fetch("http://localhost:3000/api/admin/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // if you use JWT later:
        // Authorization: "Bearer YOUR_TOKEN"
      },
    });

    const data = await res.json();
    console.log("Messages:", data);

    return data;
  } catch (err) {
    console.error("Error fetching messages:", err);
  }
}
