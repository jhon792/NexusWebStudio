import { useEffect } from "react";
import { LegalLayout, LegalH2, LegalH3, LegalP, LegalUl, LegalCallout } from "../components/LegalLayout";
import { useConsent } from "../../hooks/useConsent";

export default function CookiePolicy() {
  const { resetConsent } = useConsent();

  useEffect(() => {
    document.title = "Política de Cookies | NexuStudio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalLayout title="Política de Cookies" lastUpdated="30 de mayo de 2025">
      <LegalCallout>
        Puedes cambiar tus preferencias de cookies en cualquier momento haciendo clic en el botón al final de esta página o visitando nuestra configuración de privacidad.
      </LegalCallout>

      <LegalH2>1. ¿Qué son las cookies?</LegalH2>
      <LegalP>
        Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador o dispositivo cuando los visitas. Sirven para que el sitio funcione correctamente, recuerde tus preferencias y nos ayude a entender cómo interactúas con el contenido.
      </LegalP>

      <LegalH2>2. Tipos de cookies que usamos</LegalH2>

      <LegalH3>2.1 Cookies Necesarias (siempre activas)</LegalH3>
      <LegalP>
        Son imprescindibles para el funcionamiento básico del sitio. Sin ellas, el sitio no puede funcionar correctamente. No recopilan información de identificación personal.
      </LegalP>
      <LegalUl>
        <li><strong>cookie-consent-v1:</strong> Almacena tus preferencias de cookies. Duración: 12 meses. Propia.</li>
        <li><strong>Sesión del navegador:</strong> Cookies de sesión para navegación básica. Duración: sesión.</li>
      </LegalUl>

      <LegalH3>2.2 Cookies Analíticas (requieren consentimiento)</LegalH3>
      <LegalP>
        Nos permiten entender cómo los visitantes interactúan con el sitio web, qué páginas son más populares y cómo llegaron a nosotros. Toda la información es anónima.
      </LegalP>
      <LegalUl>
        <li><strong>_ga:</strong> Google Analytics 4 — identifica sesiones únicas. Duración: 2 años. Tercero: Google LLC.</li>
        <li><strong>_ga_[ID]:</strong> Google Analytics 4 — almacena el estado de la sesión. Duración: 2 años. Tercero: Google LLC.</li>
        <li><strong>_gid:</strong> Google Analytics — diferencia usuarios. Duración: 24 horas. Tercero: Google LLC.</li>
      </LegalUl>
      <LegalP>
        Google Analytics 4 está configurado con anonimización de IP activada y sin datos de identificación personal. Consulta la{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-zinc-900 underline">política de privacidad de Google</a>.
      </LegalP>

      <LegalH3>2.3 Cookies de Marketing (requieren consentimiento)</LegalH3>
      <LegalP>
        Se usan para mostrar publicidad relevante en otras plataformas y medir la efectividad de campañas. Actualmente no tenemos cookies de marketing activas. Si en el futuro las implementamos, actualizaremos esta política.
      </LegalP>

      <LegalH2>3. Transferencias internacionales</LegalH2>
      <LegalP>
        Google Analytics transfiere datos a servidores en Estados Unidos. Estas transferencias se realizan bajo las Cláusulas Contractuales Estándar aprobadas por la Comisión Europea y el marco Privacy Shield sucesor.
      </LegalP>

      <LegalH2>4. Cómo gestionar tus cookies</LegalH2>

      <LegalH3>4.1 Mediante nuestro panel de preferencias</LegalH3>
      <LegalP>
        Puedes cambiar tus preferencias en cualquier momento usando el botón de abajo. Tus cambios tendrán efecto inmediato.
      </LegalP>

      <div className="my-6">
        <button
          onClick={() => {
            resetConsent();
            window.scrollTo(0, 0);
          }}
          className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition-colors cursor-pointer text-sm font-semibold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Cambiar mis preferencias de cookies
        </button>
      </div>

      <LegalH3>4.2 Mediante la configuración de tu navegador</LegalH3>
      <LegalUl>
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
        <li><strong>Firefox:</strong> Opciones → Privacidad & Seguridad → Cookies y datos del sitio</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web</li>
        <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies</li>
      </LegalUl>
      <LegalP>
        Ten en cuenta que bloquear todas las cookies puede afectar la funcionalidad de algunos sitios web.
      </LegalP>

      <LegalH3>4.3 Opt-out de Google Analytics</LegalH3>
      <LegalP>
        Puedes optar por no ser rastreado por Google Analytics instalando el complemento de inhabilitación de Google Analytics:{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-zinc-900 underline">
          tools.google.com/dlpage/gaoptout
        </a>
      </LegalP>

      <LegalH2>5. Actualizaciones de esta política</LegalH2>
      <LegalP>
        Actualizaremos esta política cuando cambiemos las cookies que usamos o cuando cambien las leyes aplicables. La fecha de última actualización aparece al inicio de este documento.
      </LegalP>

      <LegalH2>6. Contacto</LegalH2>
      <LegalP>
        Si tienes preguntas sobre nuestra política de cookies, escríbenos a{" "}
        <a href="mailto:jhonpalencia11@gmail.com" className="text-zinc-900 underline">jhonpalencia11@gmail.com</a>.
      </LegalP>
    </LegalLayout>
  );
}
