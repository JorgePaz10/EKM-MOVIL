import { supabase } from "../lib/supabase";

export const getGatewaysUsuario = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    throw new Error("No hay un usuario autenticado");
  }

  const { data, error } = await supabase
    .from("gateways")
    .select(`
      id,
      nombre,
      cliente,
      url_api,
      activo
    `)
    .order("cliente", { ascending: true })
    .order("nombre", { ascending: true });

  if (error) {
    console.log("Error obteniendo gateways:", error.message);
    throw error;
  }

  return data;
};