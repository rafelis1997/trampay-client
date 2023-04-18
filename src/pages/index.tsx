import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-contex";

const loginFormSchema = z.object({
  email: z.string().email("Por favor insira um email em um formato válido"),
  password: z.string().min(8, "Deve ter um tamanho mínimo de 8 dígitos"),
});

type loginFormInputs = z.infer<typeof loginFormSchema>;

export default function Home() {
  const { signIn, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  async function handleFormSubmit({ email, password }: loginFormInputs) {
    await signIn(email, password);
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <form
        className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h1 className="font-bold text-2xl">Sign-in</h1>
        <label htmlFor="email" className="flex flex-col grow font-semibold">
          Email
          <input
            type="text"
            placeholder="email@example.com"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("email")}
          />
        </label>

        <label htmlFor="password" className="flex flex-col grow font-semibold">
          Senha
          <input
            type="password"
            placeholder="Senha"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("password")}
          />
        </label>

        <button
          type="submit"
          className="text-slate-700 font-bold text-lg py-2 rounded bg-brand-500 hover:bg-brand-700 disabled:bg-brand-700 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
