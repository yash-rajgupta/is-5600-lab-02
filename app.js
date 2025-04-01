document.addEventListener('DOMContentLoaded', () => {
    // Parse the data files into objects
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate the user list
    generateUserList(userData, stocksData);
  
    // Function to generate the user list
    function generateUserList(users, stocks) {
      const userList = document.querySelector('.user-list');
      // Clear the previous list before rendering new one
      userList.innerHTML = '';
  
      users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
  
      // Register event listener on the list
      userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }
  
    // Function to handle user selection
    function handleUserListClick(event, users, stocks) {
      const userId = event.target.id;
      const user = users.find(user => user.id == userId);
  
      // Populate the user form with selected user data
      populateForm(user);
  
      // Render the portfolio items for the user
      renderPortfolio(user, stocks);
    }
  
    // Function to populate the form with selected user data
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = user.firstname;
      document.querySelector('#lastname').value = user.lastname;
      document.querySelector('#address').value = user.address;
      document.querySelector('#city').value = user.city;
      document.querySelector('#email').value = user.email;
    }
  
    // Function to render portfolio items for the selected user
    function renderPortfolio(user, stocks) {
      const { portfolio } = user;
      const portfolioDetails = document.querySelector('.portfolio-list');
      portfolioDetails.innerHTML = ''; // Clear previous portfolio items
  
      portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
      });
  
      // Register event listener on portfolio actions
      portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          viewStock(event.target.id, stocks);
        }
      });
    }
  
    // Function to view stock details
    function viewStock(symbol, stocks) {
      const stockArea = document.querySelector('.stock-form');
      if (stockArea) {
        const stock = stocks.find(stock => stock.symbol == symbol);
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
      }
    }
  
    // Add event listener for the Save button
    const saveButton = document.querySelector('#btnSave');
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        userData[userIndex].user.firstname = document.querySelector('#firstname').value;
        userData[userIndex].user.lastname = document.querySelector('#lastname').value;
        userData[userIndex].user.address = document.querySelector('#address').value;
        userData[userIndex].user.city = document.querySelector('#city').value;
        userData[userIndex].user.email = document.querySelector('#email').value;
        
        generateUserList(userData, stocksData); // Refresh the user list
      }
    });
  
    // Add event listener for the Delete button
    const deleteButton = document.querySelector('#btnDelete');
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1); // Remove the user from the array
        generateUserList(userData, stocksData); // Refresh the user list
      }
    });
  });
  