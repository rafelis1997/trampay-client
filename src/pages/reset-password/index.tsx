import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const resetPasswordFormSchema = z.object({
  email: z.string().email("Por favor insira um email em um formato válido"),
});

type resetPasswordInputs = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPassword() {
  const [link, setLink] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordInputs>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: undefined,
    },
  });

  async function handleResetPassword({ email }: resetPasswordInputs) {
    try {
      const response = await axios.post(
        "http://localhost:3333/auth/recoverPassword",
        {
          email,
        }
      );
      setLink(response.data);
    } catch (error) {
      toast.error("Não foi possível enviar para o email informado", {
        theme: "dark",
      });
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      {link ? (
        <div className="flex flex-col gap-4 max-w-md p-12 rounded drop-shadow-md overflow-hidden">
          <h2>
            Este link seria mandado para o email do usuário, mas para fins do
            escopo teste será retornado aqui
          </h2>

          <a href={link} className="underline text-blue-500 max-w-md">
            {link}
          </a>
        </div>
      ) : null}
      <form
        className="flex flex-col gap-4 max-w-md h-auto bg-slate-200 p-12 rounded drop-shadow-md"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <h1 className="font-bold text-2xl">Resetar senha</h1>
        <p>
          Envie o email cadastrado na sua conta abaixo, caso seja encontrado
          entraremos em contato para seguir com o processo
        </p>
        <label htmlFor="email" className="flex flex-col grow font-semibold">
          Email
          <input
            type="text"
            placeholder="email@example.com"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </label>

        <button
          type="submit"
          className="text-slate-700 font-bold text-lg py-2 rounded bg-brand-500 hover:bg-brand-700 disabled:bg-brand-700 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
