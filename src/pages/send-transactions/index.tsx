import { z } from "zod";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosApi } from "@/api/api";

const sendTransactionsFormSchema = z.object({
  file_asset:
    typeof window === "undefined" ? z.string() : z.record(z.any()).nullable(),
});

type sendTransactionsInput = z.infer<typeof sendTransactionsFormSchema>;

export default function SendTransactions() {
  const { token, isLoggedIn, renewSession } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<sendTransactionsInput>({
    resolver: zodResolver(sendTransactionsFormSchema),
    defaultValues: {
      file_asset: undefined,
    },
  });

  async function sendFile(data: sendTransactionsInput) {
    const id = toast.loading("Enviando...", {
      position: "bottom-center",
    });
    try {
      const formData = new FormData();
      const files = data.file_asset as FileList;
      formData.append("file_asset", files[0]);

      await axiosApi.post("/users/transactions", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      await renewSession();

      toast.update(id, {
        render: "Transações adicionadas com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 15,
        position: "bottom-center",
      });
    } catch (error) {
      toast.update(id, {
        render: "Não foi possível adicionar as transações",
        type: "error",
        theme: "dark",
        autoClose: 15,
        isLoading: false,
        position: "bottom-center",
      });
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex-1 flex justify-center items-center">
      <form
        className="flex flex-col grow gap-4 max-w-md bg-slate-200 p-12 rounded drop-shadow-md"
        onSubmit={handleSubmit(sendFile)}
        encType="multipart/form-data"
      >
        <h1 className="font-bold text-2xl">Resetar senha</h1>
        <label
          htmlFor="file_asset"
          className="flex flex-col grow font-semibold"
        >
          Envie o arquivo (.csv) com as transações
          <input
            type="file"
            accept=".csv"
            placeholder="Arquivo .csv"
            className="font-normal mt-2 px-4 py-2 rounded-sm"
            {...register("file_asset")}
          />
          {errors.file_asset && (
            <p className="text-red-500">{errors.file_asset?.message}</p>
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
