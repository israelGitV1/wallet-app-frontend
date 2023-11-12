const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = fetch("https://mp-wallet-app-api.herokuapp.com/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, * cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must mutch "Content-Type" header
    });

    const user = (await response).json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (name.length < 3) {
    alert("Nome deve conter mais de 3 caracters.");
    return;
  }

  if (email.length < 5 || !email.includes("@")) {
    alert("Email inválido !");
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    alert("Falha ao validar e-mail !");
    return;
  }
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("../home/index.html ", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
