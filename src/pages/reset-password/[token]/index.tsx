import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const newPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Deve ter um tamanho mínimo de 8 dígitos"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas são diferentes",
    path: ["confirm"],
  });

type newPasswordFormInputs = z.infer<typeof newPasswordFormSchema>;

export default function ChangePassword() {
  const router = useRouter();

  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<newPasswordFormInputs>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      password: undefined,
      confirm: undefined,
    },
  });

  async function handleResetPassword({ password }: newPasswordFormInputs) {
    try {
      await axios.put(`http://localhost:3333/auth/recoverPassword/${token}`, {
        password,
      });

      toast("Senha renovada com sucesso!", {
        onClose: () => {
          router.push("/");
        },
        type: "success",
      });
    } catch (error) {
      toast.error("Não foi possível resetar a senha do usuário", {
        theme: "dark",
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <form
        className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <h1 className="font-bold text-2xl">Nova senha</h1>

        <label htmlFor="password" className="flex flex-col grow font-semibold">
          Nova senha
          <input
            type="password"
            placeholder="Senha"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </label>

        <label htmlFor="confirm" className="flex flex-col grow font-semibold">
          Digite a senha novamente
          <input
            type="password"
            placeholder="Confirme a senha"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-red-500">{errors.confirm?.message}</p>
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
