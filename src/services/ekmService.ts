import { supabase } from "../lib/supabase";

// ---------------------------------------------------------------
// ---------------------------------------------------------------
//  LOGICA DE GATEWAYS CLIENTES
// ---------------------------------------------------------------
// ---------------------------------------------------------------

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


// ---------------------------------------------------------------
// ---------------------------------------------------------------
//     LOGICA DE MEDIDORES POR GATEWAYS
// ---------------------------------------------------------------
// ---------------------------------------------------------------

export const getDatosEKMGateway = async (urlApi: string) => {
  
  const response = await fetch(urlApi);

  if (!response.ok) {
    throw new Error(
      `Error consultando EKM: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
};

// ---------------------------------------------------------------
// ---------------------------------------------------------------
//  DATOS AGREGADOS: GATEWAYS + MEDIDORES EN VIVO
// ---------------------------------------------------------------
// ---------------------------------------------------------------

export const getResumenCompleto = async () => {
  const gateways = await getGatewaysUsuario();

  const gatewaysConMedidores = await Promise.all(
    gateways.map(async (gateway: any) => {
      try {
        const data = await getDatosEKMGateway(gateway.url_api);
        const readSet = data?.readMeter?.ReadSet ?? [];

        const medidores = readSet.map((item: any) => {
          const lectura = item.ReadData?.[0];
          const kwh = lectura ? parseFloat(lectura.kWh_Tot) : 0;
          const tieneLectura = !!lectura && lectura.Good === 1;

          return {
            id: item.Meter,
            nombre: item.Meter_Name?.trim()
              ? item.Meter_Name
              : `Medidor ${item.Meter}`,
            mac: item.MAC_Addr,
            estado: tieneLectura ? "Online" : "Offline",
            lectura: kwh,
            fecha: lectura?.Date ?? "",
            hora: lectura?.Time ?? "",
          };
        });

        return { ...gateway, medidores, errorConexion: false };

      } catch (error) {
        console.log(
          `Error consultando gateway ${gateway.nombre}:`,
          error
        );
        return { ...gateway, medidores: [], errorConexion: true };
      }
    })
  );

  return gatewaysConMedidores;
};