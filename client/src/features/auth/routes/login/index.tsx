function Login() {
  return (
    <div className='flex text-center min-w-full min-h-screen place-items-center justify-center'>
      <button
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
        }}
      >
        Login with Github
      </button>
    </div>
  );
}

export default Login;
