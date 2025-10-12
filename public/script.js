  // Modal functionality
        const signinBtn = document.getElementById('signin-btn');
        const signupBtn = document.getElementById('signup-btn');
        const signinModal = document.getElementById('signin-modal');
        const signupModal = document.getElementById('signup-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const switchToSignup = document.getElementById('switch-to-signup');
        const switchToSignin = document.getElementById('switch-to-signin');
        
        // Open modals
        signinBtn.addEventListener('click', () => {
            signinModal.style.display = 'flex';
        });
        
        signupBtn.addEventListener('click', () => {
            signupModal.style.display = 'flex';
        });
        
        // Close modals
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                signinModal.style.display = 'none';
                signupModal.style.display = 'none';
            });
        });
        
        // Switch between modals
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signinModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
        
        switchToSignin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.style.display = 'none';
            signinModal.style.display = 'flex';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === signinModal) {
                signinModal.style.display = 'none';
            }
            if (e.target === signupModal) {
                signupModal.style.display = 'none';
            }
        });
        
        // Form submission (basic validation)
        document.getElementById('signin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sign in functionality would be implemented here!');
            signinModal.style.display = 'none';
        });
        
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Account created successfully!');
            signupModal.style.display = 'none';
        });