import { useEffect } from "react";
import { LegalLayout, LegalH2, LegalH3, LegalP, LegalUl, LegalCallout } from "../components/LegalLayout";

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Términos y Condiciones | NexuStudio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout title="Términos y Condiciones" lastUpdated="30 de mayo de 2025">
      <LegalCallout>
        Al contratar nuestros servicios o utilizar este sitio web, aceptas los presentes términos. Si tienes dudas, contáctanos antes de proceder.
      </LegalCallout>

      <LegalH2>1. Identificación del prestador de servicios</LegalH2>
      <LegalP>
        <strong>NexuStudio</strong> — Desarrollador Web Profesional<br />
        País de operación: Colombia<br />
        Correo: jhonpalencia11@gmail.com
      </LegalP>

      <LegalH2>2. Objeto y alcance</LegalH2>
      <LegalP>
        Los presentes Términos y Condiciones regulan la contratación de servicios de desarrollo web, diseño, SEO, hosting, mantenimiento y servicios relacionados ofrecidos por NexuStudio, así como el uso de este sitio web.
      </LegalP>

      <LegalH2>3. Proceso de contratación</LegalH2>
      <LegalH3>3.1 Solicitud y propuesta</LegalH3>
      <LegalP>
        El proceso se inicia con una consulta (formulario, email o WhatsApp). Tras analizar tus requerimientos, enviamos una propuesta detallada con alcance, plazos y precio. La propuesta es válida por <strong>15 días calendario</strong>.
      </LegalP>

      <LegalH3>3.2 Aceptación y anticipo</LegalH3>
      <LegalP>
        El contrato se formaliza cuando el cliente acepta la propuesta y realiza el pago del anticipo acordado (generalmente el 50% del valor total). El inicio del proyecto está condicionado a la recepción del anticipo.
      </LegalP>

      <LegalH3>3.3 Pago final</LegalH3>
      <LegalP>
        El saldo restante se paga antes de la entrega del sitio en producción o según el cronograma de pagos acordado en la propuesta.
      </LegalP>

      <LegalH2>4. Obligaciones del cliente</LegalH2>
      <LegalUl>
        <li>Proporcionar toda la información, contenido (textos, imágenes, logos) y accesos necesarios en los plazos acordados.</li>
        <li>Revisar y aprobar las entregas parciales (diseños, maquetas) en un plazo máximo de <strong>5 días hábiles</strong>.</li>
        <li>Realizar los pagos en los términos y plazos acordados.</li>
        <li>Designar un interlocutor principal para la comunicación del proyecto.</li>
      </LegalUl>

      <LegalH2>5. Entregas y revisiones</LegalH2>
      <LegalP>
        Cada plan incluye un número determinado de rondas de revisión especificado en la propuesta. Las modificaciones que excedan este número o que representen cambios sustanciales en el alcance original se presupuestarán por separado.
      </LegalP>

      <LegalH2>6. Propiedad intelectual</LegalH2>
      <LegalH3>6.1 Derechos del cliente</LegalH3>
      <LegalP>
        Una vez realizado el pago total, el cliente adquiere los derechos de uso del sitio web desarrollado. Los archivos fuente (código, diseños) se entregan según lo acordado en la propuesta.
      </LegalP>

      <LegalH3>6.2 Derechos del desarrollador</LegalH3>
      <LegalP>
        NexuStudio se reserva el derecho de mostrar el proyecto en su portafolio y mencionar al cliente como referencia, salvo indicación contraria expresa del cliente.
      </LegalP>

      <LegalH3>6.3 Herramientas de terceros</LegalH3>
      <LegalP>
        El sitio puede incluir bibliotecas de código abierto, fuentes gratuitas o componentes de terceros bajo sus respectivas licencias (MIT, Apache, etc.), que el cliente acepta al contratar el servicio.
      </LegalP>

      <LegalH2>7. Garantía y soporte post-entrega</LegalH2>
      <LegalP>
        Cada plan incluye un período de soporte post-lanzamiento para corrección de errores relacionados con el desarrollo. Este período no cubre cambios de contenido, nuevas funcionalidades ni problemas causados por modificaciones realizadas por el cliente o terceros.
      </LegalP>

      <LegalH2>8. Limitación de responsabilidad</LegalH2>
      <LegalP>
        NexuStudio no será responsable de pérdidas indirectas, daños emergentes ni lucro cesante derivados del uso o imposibilidad de uso del sitio web. La responsabilidad total está limitada al valor del servicio contratado.
      </LegalP>
      <LegalP>
        No somos responsables de la disponibilidad, seguridad o rendimiento de servicios de terceros (hosting, pasarelas de pago, redes sociales) una vez entregado el proyecto.
      </LegalP>

      <LegalH2>9. Cancelación y reembolsos</LegalH2>
      <LegalUl>
        <li><strong>Cancelación antes de iniciar:</strong> reembolso del 100% del anticipo.</li>
        <li><strong>Cancelación durante el desarrollo (antes del 50% avance):</strong> reembolso del 50% del anticipo.</li>
        <li><strong>Cancelación con más del 50% de avance:</strong> sin reembolso del anticipo. El trabajo realizado hasta ese momento queda a disposición del cliente.</li>
        <li><strong>Cancelación unilateral por NexuStudio:</strong> reembolso total del anticipo.</li>
      </LegalUl>

      <LegalH2>10. Ley aplicable y jurisdicción</LegalH2>
      <LegalP>
        Estos términos se rigen por las leyes de la República de Colombia. Para cualquier controversia, las partes acuerdan someterse a los tribunales competentes de Colombia, salvo acuerdo mutuo de arbitraje.
      </LegalP>

      <LegalH2>11. Modificaciones</LegalH2>
      <LegalP>
        Nos reservamos el derecho de modificar estos términos. Los cambios se publicarán en esta página con la nueva fecha de actualización. El uso continuado de nuestros servicios implica la aceptación de los términos vigentes.
      </LegalP>

      <LegalH2>12. Contacto</LegalH2>
      <LegalP>
        Para cualquier consulta sobre estos términos:{" "}
        <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a> o WhatsApp:{" "}
        <a href="https://wa.me/573123198706" target="_blank" rel="noopener noreferrer" className="text-zinc-900 underline">+57 312 319 8706</a>
      </LegalP>
    </LegalLayout>
  );
}
