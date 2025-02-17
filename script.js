// script.js (for second-page.html)
document.addEventListener('DOMContentLoaded', async function () {
    const connectWalletButton = document.getElementById('connect-wallet');
    let userWalletAddress = null;
    let googleUser = null;

    // Initialize Web3
    let web3;

    
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        // Initialize web3 instance
        web3 = new Web3(window.ethereum);

        connectWalletButton.addEventListener('click', async () => {
            try {
                // Request account access from MetaMask
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                userWalletAddress = accounts[0];
                
                // Fetch  balance of the connected wallet
                const balance = await web3.eth.getBalance(userWalletAddress);
                const balanceInEther = web3.utils.fromWei(balance, 'ether');

                console.log(`Wallet Address: ${userWalletAddress}`);
                console.log(`Balance: ${balanceInEther} ETH`);

                // Redirect to the third page, passing wallet address as accountId
                window.location.href = `third-page.html?accountId=${encodeURIComponent(userWalletAddress)}&balance=${encodeURIComponent(balanceInEther)}`;
            } catch (error) {
                console.error('Error connecting to wallet:', error);
                alert('Error connecting to wallet. Please try again.');
            }
        });
    } else {
        alert('Please install MetaMask to connect your wallet.');
    }

    window.onload = function () {
        google.accounts.id.initialize({
            client_id: '531400833160-nv50g34runvh4eljtr5h7igtmdsqkji9.apps.googleusercontent.com',
            callback: handleGoogleSignIn
        });
        google.accounts.id.renderButton(
            document.getElementById('google-signin'),
            { theme: 'outline', size: 'large' }
        );
    };

   
    function handleGoogleSignIn(response) {
        const credential = response.credential;
        const decodedCredential = jwt_decode(credential);
        googleUser = {
            name: decodedCredential.name,
            email: decodedCredential.email
        };

        
        window.location.href = `third-page.html?name=${encodeURIComponent(googleUser.name)}&email=${encodeURIComponent(googleUser.email)}`;
    }
});
