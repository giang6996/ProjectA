const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result)

        if (response.ok) {
            console.log('Server response:', result);
            alert(`Registration successful! Welcome, ${result.username}`);
            // Codes for redirection or UI update here
            
        } else {
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
};
