import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const resetPasswordFormSchema = z.object({
  email: z.string().email("Por favor insira um email em um formato válido"),
});

type resetPasswordInputs = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPassword() {
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

  return (
    <div className="flex-1 flex justify-center items-center">
      <form className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md">
        <h1 className="font-bold text-2xl">Resetar senha</h1>
        <label htmlFor="email" className="flex flex-col grow font-semibold">
          Email
          <input
            type="text"
            placeholder="email@example.com"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("email")}
          />
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
