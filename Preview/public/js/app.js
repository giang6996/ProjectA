const pages = {
    customer: {
        home: 'pages/customer/home.html',
        // products: 'pages/customer/products.html',
        // cart: 'pages/customer/cart.html'
    },
    manager: {
        home: 'pages/manager/home.html',
        // dashboard: 'pages/manager/dashboard.html',
        // inventory: 'pages/manager/inventory.html',
        // orders: 'pages/manager/orders.html'
    },
    staff: {
        // orders: 'pages/staff/orders.html',
        // customers: 'pages/staff/customers.html'
    },
    login: 'pages/login.html',
    signup: 'pages/signup.html'
};

const loadPage = async (page) => {
    const response = await fetch(page);
    if (response.ok) {
        return await response.text();
    } else {
        throw new Error(`Failed to load page: ${page}`);
    }
};

const renderPage = async (page) => {
    const app = document.getElementById('app');
    try {
        app.innerHTML = await loadPage(pages[page]);
        switch (page) {
            case 'signup':
                app.innerHTML = await loadPage(pages.signup);
                const signupForm = document.getElementById('signupForm');
                if (signupForm) {
                    signupForm.addEventListener('submit', handleSignup);
                }
                break;
            case 'login':
                app.innerHTML = await loadPage(pages.login);
                const loginForm = document.getElementById('loginForm');
                if (loginForm) {
                    loginForm.addEventListener('submit', handleLogin);
                }
                break;
            default:
                app.innerHTML = await loadPage(pages.landing);
        }
    } catch (error) {
        console.error(error);
        app.innerHTML = '<p>Error loading page.</p>';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            renderPage(page);
        });
    });

    renderPage('landing');
});