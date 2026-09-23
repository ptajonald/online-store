import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    alert(`submitted with email: ${data.email} and password: ${data.password}`);
  }

  return (
    <div style={{}}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{}}>
          <label>
            Email
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: "Email required" })}
            ></input>
          </label>
          {errors.email && (
            <p style={{ color: "crimson" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{}}>
          <label>
            Password
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be at most 16 characters",
                },
              })}
            ></input>
          </label>
          {errors.password && (
            <p style={{ color: "crimson" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
