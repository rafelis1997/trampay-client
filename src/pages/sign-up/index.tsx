import { useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import axios from "axios";
import { axiosApi } from "@/api/api";

const signUpFormSchema = z
  .object({
    document: z.string().min(11, "Documento deve ter no mínimo 11 caracteres"),
    email: z.string().email("Por favor insira um email em um formato válido"),
    password: z.string().min(8, "Deve ter um tamanho mínimo de 8 dígitos"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas são diferentes",
    path: ["confirm"],
  });

type signUpFormInputs = z.infer<typeof signUpFormSchema>;

export default function Home() {
  const { signIn, isLoggedIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpFormInputs>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
      confirm: undefined,
      document: undefined,
    },
  });

  async function handleFormSubmit({
    email,
    password,
    document,
  }: signUpFormInputs) {
    try {
      await axiosApi.post("/users", {
        email,
        password,
        document,
      });

      toast.success("Usuário criado com sucesso", {
        position: "bottom-center",
      });

      await signIn(email, password);
    } catch (error) {
      toast.error("Não foi possível criar usuário", {
        theme: "dark",
        position: "bottom-center",
      });
    }
  }

  useEffect(() => {
    console.log(process.env.BASE_URL);
    if (isLoggedIn) {
      router.push("/send-transactions");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex-1 flex justify-center items-center">
      <form
        className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h1 className="font-bold text-2xl">Criar conta</h1>
        <label htmlFor="email" className="flex flex-col grow font-semibold">
          Email
          <input
            type="text"
            id="email"
            placeholder="email@example.com"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </label>

        <label htmlFor="document" className="flex flex-col grow font-semibold">
          Documento
          <input
            type="text"
            id="document"
            placeholder="email@example.com"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("document")}
          />
          {errors.document && (
            <p className="text-red-500">{errors.document?.message}</p>
          )}
        </label>

        <label htmlFor="password" className="flex flex-col grow font-semibold">
          Senha
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </label>

        <label htmlFor="confirm" className="flex flex-col grow font-semibold">
          Confirmação de Senha
          <input
            type="password"
            id="confirm"
            placeholder="Confirmação de senha"
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
          Inscrever-se
        </button>
      </form>
    </div>
  );
}
