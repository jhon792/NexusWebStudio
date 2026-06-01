import { useEffect } from "react";
import { LegalLayout, LegalH2, LegalH3, LegalP, LegalUl, LegalCallout } from "../components/LegalLayout";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Política de Privacidad | NexuStudio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="30 de mayo de 2025">
      <LegalCallout>
        Tu privacidad es importante para nosotros. Esta política explica de forma clara qué datos recopilamos, para qué los usamos y cuáles son tus derechos. Si tienes preguntas, escríbenos a{" "}
        <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a> o por{" "}
        <a href="https://wa.me/573123198706" className="text-zinc-900 underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
      </LegalCallout>

      <LegalH2>1. Responsable del tratamiento</LegalH2>
      <LegalP>
        <strong>NexuStudio</strong> — Desarrollador Web Profesional<br />
        Correo electrónico: jhonpalencia11@gmail.com<br />
        País: Colombia
      </LegalP>

      <LegalH2>2. Datos que recopilamos</LegalH2>

      <LegalH3>2.1 Datos que tú nos proporcionas</LegalH3>
      <LegalUl>
        <li><strong>Nombre completo:</strong> para identificarte y dirigirnos a ti correctamente.</li>
        <li><strong>Correo electrónico:</strong> para enviarte nuestra respuesta y comunicaciones relacionadas con tu proyecto.</li>
        <li><strong>Teléfono / WhatsApp:</strong> para contactarte de forma ágil (opcional).</li>
        <li><strong>Descripción del proyecto:</strong> para elaborar una propuesta personalizada.</li>
        <li><strong>Presupuesto aproximado:</strong> para adaptar la oferta a tus posibilidades.</li>
      </LegalUl>

      <LegalH3>2.2 Datos recopilados automáticamente</LegalH3>
      <LegalUl>
        <li><strong>Dirección IP:</strong> para análisis de seguridad y estadísticas geográficas.</li>
        <li><strong>Tipo de dispositivo y navegador:</strong> para optimizar la experiencia de usuario.</li>
        <li><strong>Páginas visitadas y tiempo en el sitio</strong> (solo con consentimiento de cookies analíticas).</li>
        <li><strong>Fuente de tráfico:</strong> cómo llegaste a nuestro sitio (buscador, redes sociales, enlace directo).</li>
      </LegalUl>

      <LegalH2>3. Finalidad y base legal del tratamiento</LegalH2>
      <LegalUl>
        <li><strong>Responder consultas y cotizaciones</strong> — Base: ejecución de precontrato / interés legítimo.</li>
        <li><strong>Enviar información sobre nuestros servicios</strong> (solo si lo solicitas) — Base: consentimiento.</li>
        <li><strong>Mejorar el sitio web mediante análisis</strong> — Base: consentimiento (cookies analíticas).</li>
        <li><strong>Cumplir obligaciones legales</strong> — Base: obligación legal.</li>
      </LegalUl>

      <LegalH2>4. Tiempo de conservación</LegalH2>
      <LegalP>
        Conservamos tus datos durante el tiempo necesario para la finalidad para la que fueron recogidos:
      </LegalP>
      <LegalUl>
        <li>Datos de contacto y consultas: <strong>2 años</strong> desde el último contacto.</li>
        <li>Datos de clientes activos: <strong>duración de la relación comercial + 5 años</strong> (obligaciones fiscales/contables).</li>
        <li>Datos de análisis web (cookies): <strong>13 meses</strong> (estándar GA4).</li>
        <li>Datos de logs de seguridad: <strong>90 días</strong>.</li>
      </LegalUl>

      <LegalH2>5. Con quién compartimos tus datos</LegalH2>
      <LegalP>
        No vendemos ni cedemos tus datos a terceros. Solo los compartimos con:
      </LegalP>
      <LegalUl>
        <li><strong>Google Analytics 4</strong> — análisis de tráfico (solo con tu consentimiento). Transferencia a EE.UU. con cláusulas contractuales estándar.</li>
        <li><strong>Google Workspace</strong> — gestión del correo electrónico empresarial.</li>
        <li><strong>Proveedores de hosting</strong> (Vercel/Netlify) — alojamiento del sitio web.</li>
        <li><strong>Autoridades competentes</strong> — cuando exista obligación legal.</li>
      </LegalUl>

      <LegalH2>6. Tus derechos</LegalH2>
      <LegalP>
        De acuerdo con la Ley 1581 de 2012 (Habeas Data, Colombia) y el RGPD europeo, tienes derecho a:
      </LegalP>
      <LegalUl>
        <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
        <li><strong>Rectificación:</strong> corregir datos incorrectos o desactualizados.</li>
        <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
        <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
        <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
        <li><strong>Limitación:</strong> restringir el tratamiento en determinadas circunstancias.</li>
        <li><strong>Retirar el consentimiento</strong> en cualquier momento, sin efectos retroactivos.</li>
      </LegalUl>
      <LegalP>
        Para ejercer tus derechos, escríbenos a <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a> con el asunto "Derechos ARCO". Respondemos en máximo <strong>15 días hábiles</strong>.
      </LegalP>

      <LegalH2>7. Seguridad</LegalH2>
      <LegalP>
        Implementamos medidas técnicas y organizativas para proteger tus datos: HTTPS/TLS en todo el sitio, cabeceras de seguridad HTTP (CSP, HSTS, X-Frame-Options), acceso restringido a datos personales y revisión periódica de dependencias vulnerables.
      </LegalP>

      <LegalH2>8. Cookies</LegalH2>
      <LegalP>
        Utilizamos cookies propias y de terceros. Puedes conocer todos los detalles en nuestra{" "}
        <a href="/cookies" className="text-zinc-900 underline">Política de Cookies</a> y gestionar tus preferencias en cualquier momento.
      </LegalP>

      <LegalH2>9. Cambios en esta política</LegalH2>
      <LegalP>
        Podemos actualizar esta política cuando sea necesario. La fecha de última actualización aparece al inicio del documento. Si los cambios son significativos, te lo notificaremos.
      </LegalP>

      <LegalH2>10. Contacto y reclamaciones</LegalH2>
      <LegalP>
        Si consideras que el tratamiento de tus datos no es adecuado, puedes contactarnos en <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a> o presentar una reclamación ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> de Colombia (<a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-zinc-900 underline">www.sic.gov.co</a>).
      </LegalP>
    </LegalLayout>
  );
}
