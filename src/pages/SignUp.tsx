import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email('Incorrect email'),
    password: z.string().min(6, 'Minimum 6'),
    confirmPassword: z
      .string()
      .min(6, 'Minimum 6'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

function Register() {
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
    const newUser = {
      email: data.email,
      password: data.password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    localStorage.setItem('isAuthorized', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  
    navigate('/movies');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label>Email:</label>
          <input
            {...register('email')}
            className="border p-2 w-full"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label>Confirm password:</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="border p-2 w-full"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Sign up
        </button>
        <p className="mt-4 text-center">
          Already have account?{' '}
          <NavLink to="/login" className="text-blue-500">
            Log in
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
