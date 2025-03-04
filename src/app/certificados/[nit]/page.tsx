import Image from "next/image";
import axios from "axios";

type PageProps = {
  params: { nit: string };
};

async function fetchDocuments(nit: string) {
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/empresas/${nit}`);
    return response.data.documentos;
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return [];
  }
}

export default async function ResponsiveImage({ params }: PageProps) {
  const nit = params.nit; // ✅ Ya no hay que hacer `await params.nit`
  const documents = await fetchDocuments(nit);

  return (
    <div className="flex flex-col sm:bg-[url('/background2.svg')] bg-cover bg-center sm:p-10 gap-16">
      <div className="flex justify-center items-center">
        <Image src="/CodyBannerIzq.png" width={200} height={200} alt="Cody - Mascota de Transmeralda" />
      </div>
      <div className="space-y-10 flex-col items-center bg-white rounded-xl shadow-xl p-4 md:p-10">
        <h2 className="text-lg font-semibold text-center">Documentos de la empresa con NIT: {nit}</h2>
        <ul className="space-y-5">
          {documents.length > 0 ? (
            documents.map((doc: { nombre: string; url: string }, index: number) => (
              <li key={index} className="text-blue-500 underline shadow-sm border border-gray-200 p-4 rounded-md">
                <a className="flex items-center gap-5 max-sm:text-xs" href={doc.url} target="_blank" rel="noopener noreferrer">
                  <Image src="/pdf_icon.png" width={48} height={48} alt="Icono de archivo" />
                  {doc.nombre}
                </a>
              </li>
            ))
          ) : (
            <p>No hay documentos disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

