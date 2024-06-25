const logoutSection = document.getElementById('logoutSection');

const logoutButton = `
    <h3>Log Out</h3>
    <button type="submit" id="logoutBtn">Log Out</button>
`;

logoutSection.innerHTML = logoutButton;

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
});