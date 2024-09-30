import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('incorrect email'),
  password: z.string().min(6, 'minimum 6'),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    const user = users.find(
      (user: any) => user.email === data.email && user.password === data.password
    );
  
    if (user) {
      localStorage.setItem('isAuthorized', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/movies');
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl mb-4">Вход</h2>
          <div className="mb-4">
            <label>Email:</label>
            <input
              {...register('email')}
              className="border p-2 w-full"
              placeholder="Emter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label>Password:</label>
            <input
              {...register('password')}
              type="password"
              className="border p-2 w-full"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Log in
          </button>
          <p className="mt-4 text-center">
            Don`t have account?{' '}
            <NavLink to="/register" className="text-blue-500">
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
