import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const sendTransactionsFormSchema = z.object({
  file:
    typeof window === "undefined" ? z.string() : z.record(z.any()).nullable(),
});

type sendTransactionsInput = z.infer<typeof sendTransactionsFormSchema>;

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<sendTransactionsInput>({
    resolver: zodResolver(sendTransactionsFormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  return (
    <div className="flex-1 flex justify-center items-center">
      <form className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md">
        <h1 className="font-bold text-2xl">Resetar senha</h1>
        <label htmlFor="email" className="flex flex-col grow font-semibold">
          Envie o arquivo (.csv) com as transações
          <input
            type="file"
            placeholder="Arquivo .csv"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("file")}
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
