import { useEffect } from "react";
import { LegalLayout, LegalH2, LegalP, LegalUl } from "../components/LegalLayout";

export default function LegalNotice() {
  useEffect(() => {
    document.title = "Aviso Legal | NexuStudio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout title="Aviso Legal" lastUpdated="30 de mayo de 2025">
      <LegalH2>1. Titular del sitio web</LegalH2>
      <LegalP>
        <strong>Nombre:</strong> NexuStudio — Desarrollador Web Profesional<br />
        <strong>País:</strong> Colombia<br />
        <strong>Correo electrónico:</strong> jhonpalencia11@gmail.com
      </LegalP>

      <LegalH2>2. Objeto del sitio web</LegalH2>
      <LegalP>
        Este sitio web tiene como finalidad la presentación de servicios profesionales de desarrollo web, diseño, SEO técnico, e-commerce y mantenimiento de sitios web dirigidos a empresas y emprendedores en Colombia y Latinoamérica.
      </LegalP>

      <LegalH2>3. Condiciones de uso</LegalH2>
      <LegalP>
        El acceso y uso de este sitio web es gratuito y está sujeto a las presentes condiciones. El usuario se compromete a utilizar el sitio y sus contenidos conforme a la ley, la moral, las buenas costumbres y el orden público.
      </LegalP>
      <LegalP>Queda expresamente prohibido:</LegalP>
      <LegalUl>
        <li>Realizar actividades que dañen, inutilicen o deterioren el sitio web.</li>
        <li>Introducir o difundir virus informáticos o software malicioso.</li>
        <li>Reproducir o copiar contenidos sin autorización expresa.</li>
        <li>Utilizar el sitio para fines comerciales no autorizados.</li>
      </LegalUl>

      <LegalH2>4. Propiedad intelectual</LegalH2>
      <LegalP>
        Todos los contenidos de este sitio web (textos, imágenes, diseño, código, logotipos, marcas) son propiedad de NexuStudio o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual aplicables en Colombia.
      </LegalP>
      <LegalP>
        Se autoriza la visualización, impresión y descarga parcial del contenido únicamente cuando concurran las siguientes condiciones: compatibilidad con los usos del sitio, no modificación de los contenidos y cita de la fuente.
      </LegalP>

      <LegalH2>5. Responsabilidad</LegalH2>
      <LegalP>
        NexuStudio no garantiza la disponibilidad y continuidad del sitio web, aunque adoptará las medidas razonables para mantenerlo operativo. No se responsabiliza de daños producidos por causas de fuerza mayor o problemas técnicos fuera de su control.
      </LegalP>
      <LegalP>
        Los enlaces a sitios web de terceros se proporcionan únicamente como información. NexuStudio no controla ni se responsabiliza del contenido de sitios externos enlazados.
      </LegalP>

      <LegalH2>6. Protección de datos</LegalH2>
      <LegalP>
        El tratamiento de datos personales se realiza conforme a la Ley 1581 de 2012 de Colombia y el Decreto 1377 de 2013. Consulta nuestra{" "}
        <a href="/privacidad" className="text-zinc-900 underline">Política de Privacidad</a>{" "}
        para información completa sobre el tratamiento de datos.
      </LegalP>

      <LegalH2>7. Legislación aplicable</LegalH2>
      <LegalP>
        El presente aviso legal se rige por la legislación colombiana. Para cualquier controversia derivada del uso de este sitio, las partes se someten a los juzgados y tribunales competentes en Colombia.
      </LegalP>

      <LegalH2>8. Contacto</LegalH2>
      <LegalP>
        Para cualquier consulta relacionada con este aviso legal, puedes contactarnos en:{" "}
        <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a>
      </LegalP>
    </LegalLayout>
  );
}
