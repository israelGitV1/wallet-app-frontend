const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = " ";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Título");
  const titleElement = document.createElement("th");
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "right";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.classNama = "mt smaller";

    //title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    //cadegory
    const cadegoryTd = document.createElement("td");
    const cadegoryText = document.createTextNode(item.name);
    cadegoryTd.appendChild(cadegoryText);
    tableRow.appendChild(cadegoryTd);

    //Date
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    //Value
    const valueTd = document.createElement("td");
    valueTd.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRl",
      }).format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    //delete
    const deleteTd = document.createElement("td");
    deleteTd.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    //table add tableRow
    table.appendChild(tableRow);
  });
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";

  // titulo do card1
  const totalSubText = document.createTextNode("Total de lançamentos");
  const totalSubTextElement = document.createElement("h3");
  totalSubTextElement.appendChild(totalSubText);
  financeCard1.appendChild(totalSubTextElement);

  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.id = "total-element";
  totalElement.className = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  // titulo do card2
  const revenueSubText = document.createTextNode("Receitas");
  const revenueSubTextElement = document.createElement("h3");
  revenueSubTextElement.appendChild(revenueSubText);
  financeCard2.appendChild(revenueSubTextElement);

  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRl",
    }).format(revenues)
  );
  const revenueTexteElement = document.createElement("h1");
  revenueTexteElement.id = "revenue-element";
  revenueTexteElement.className = "mt smaller";
  revenueTexteElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTexteElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  // titulo do card3
  const expensesSubText = document.createTextNode("Despesas");
  const expensesSubTextElement = document.createElement("h3");
  expensesSubTextElement.appendChild(expensesSubText);
  financeCard3.appendChild(expensesSubTextElement);

  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRl",
    }).format(expenses)
  );
  const expensesTexteElement = document.createElement("h1");
  expensesTexteElement.id = "expenses-element";
  expensesTexteElement.className = "mt smaller";
  expensesTexteElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTexteElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  // titulo do card4
  const balanceSubText = document.createTextNode("Balanço");
  const balanceSubTextElement = document.createElement("h3");
  balanceSubTextElement.appendChild(balanceSubText);
  financeCard4.appendChild(balanceSubTextElement);

  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRl",
    }).format(totalValue)
  );
  const balanceTexteElement = document.createElement("h1");
  balanceTexteElement.id = "balance-element";
  balanceTexteElement.className = "mt smaller";
  balanceTexteElement.style.color = "#5936CD";
  balanceTexteElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTexteElement);
};

const onLoadFinancesDate = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  // add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = fetch("https://mp-wallet-app-api.herokuapp.com/finances", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, * cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        email: email,
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

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/categories"
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const cadegoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(cadegoryText);
      categoriesSelect.append(option);
    });
  } catch (error) {
    alert("Error ao carregar categorias !");
  }
};

const onOpenMotal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const onCloseMotal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Error ao adicionar novo dato financeiro !");
      return;
    }
    onCloseMotal();
    onLoadFinancesDate();
  } catch (error) {
    alert("Error ao adicionar novo dato financeiro !");
    console.log({ error });
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesDate();
  onLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease(event.target);
  };
};
