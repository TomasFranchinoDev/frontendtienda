import Link from 'next/link';

export const metadata = {
    title: 'Política de Privacidad',
    description: 'Política de privacidad de nuestra tienda',
};

export default function PrivacyPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                        Política de Privacidad
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Última actualización: {new Date().toLocaleDateString('es-ES')}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none space-y-8 text-foreground">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Introducción</h2>
                        <p className="text-muted-foreground">
                            Esta política de privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando utilizas nuestra tienda en línea. Nos comprometemos a proteger tu privacidad y asegurar que comprendas nuestras prácticas de recopilación y uso de datos.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Información que Recopilamos</h2>
                        <p className="text-muted-foreground mb-3">Recopilamos varios tipos de información:</p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li><strong>Información de Contacto:</strong> Nombre, correo electrónico, número de teléfono y dirección postal.</li>
                            <li><strong>Información de Pago:</strong> Detalles de facturación y dirección de envío. Los datos de tarjeta de crédito se procesan a través de pasarelas de pago seguras y no se almacenan en nuestros servidores.</li>
                            <li><strong>Información del Navegador:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de visita y comportamiento de navegación.</li>
                            <li><strong>Información de Cuenta:</strong> Nombre de usuario, contraseña (encriptada), historial de compras y preferencias.</li>
                            <li><strong>Cookies y Datos de Rastreo:</strong> Utilizamos cookies para mejorar tu experiencia y recordar tus preferencias.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Cómo Utilizamos tu Información</h2>
                        <p className="text-muted-foreground mb-3">Utilizamos la información recopilada para:</p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Procesar y completar tus pedidos</li>
                            <li>Enviarte confirmaciones de pedidos y actualizaciones de envío</li>
                            <li>Responder a tus consultas y brindar atención al cliente</li>
                            <li>Personalizar tu experiencia de navegación</li>
                            <li>Enviar comunicaciones de marketing (solo con tu consentimiento)</li>
                            <li>Detectar y prevenir fraude</li>
                            <li>Cumplir con obligaciones legales</li>
                            <li>Mejorar nuestros servicios y funcionalidades</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Protección de Datos</h2>
                        <p className="text-muted-foreground">
                            Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación SSL/TLS en todas nuestras páginas de transacción. Sin embargo, ningún método de transmisión por Internet es completamente seguro, por lo que no podemos garantizar seguridad absoluta.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Uso de Cookies</h2>
                        <p className="text-muted-foreground mb-3">
                            Utilizamos cookies para mejorar tu experiencia. Las cookies son archivos pequeños que se almacenan en tu dispositivo:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li><strong>Cookies de Sesión:</strong> Se eliminan cuando cierras el navegador</li>
                            <li><strong>Cookies Persistentes:</strong> Permanecen en tu dispositivo para mejorar experiencias futuras</li>
                            <li><strong>Cookies de Terceros:</strong> Utilizadas para análisis y publicidad</li>
                        </ul>
                        <p className="mt-3 text-muted-foreground">
                            Puedes controlar las cookies a través de la configuración de tu navegador. Sin embargo, deshabilitar cookies puede afectar la funcionalidad del sitio.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">6. Compartición de Información</h2>
                        <p className="text-muted-foreground">
                            No vendemos ni compartimos tu información personal con terceros para fines de marketing directo. Sin embargo, podemos compartir información con:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Proveedores de servicios de envío para entregar tu pedido</li>
                            <li>Procesadores de pago para transacciones seguras</li>
                            <li>Proveedores de análisis para mejorar nuestros servicios</li>
                            <li>Autoridades legales cuando lo requiera la ley</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">7. Tus Derechos</h2>
                        <p className="text-muted-foreground mb-3">
                            Tienes derecho a:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Acceder a tu información personal</li>
                            <li>Corregir datos inexactos</li>
                            <li>Solicitar la eliminación de tu información</li>
                            <li>Optar por no recibir comunicaciones de marketing</li>
                            <li>Exportar tus datos en formato estructurado</li>
                            <li>Revocar tu consentimiento en cualquier momento</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">8. Retención de Datos</h2>
                        <p className="text-muted-foreground">
                            Conservamos tu información personal durante el tiempo que sea necesario para cumplir los propósitos para los cuales fue recopilada, incluyendo para satisfacer requisitos legales, contables o de auditoría. Generalmente, los datos de cuenta se retienen mientras mantengas tu cuenta activa, y los datos de transacción se retienen durante al menos 7 años para fines contables.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">9. Cambios en Esta Política</h2>
                        <p className="text-muted-foreground">
                            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios significativos se notificarán por correo electrónico o mediante un aviso destacado en nuestro sitio. Tu uso continuado del sitio después de los cambios constituye tu aceptación de la política actualizada.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">10. Contacto</h2>
                        <p className="text-muted-foreground">
                            Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información, contáctanos a través de nuestro formulario de contacto en el sitio web o envía un correo electrónico a nuestra dirección de soporte.
                        </p>
                    </section>
                </div>
            </div>

            {/* Back to Home CTA */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
                    <p className="text-muted-foreground mb-4">
                        Para conocer más sobre nuestras condiciones de compra, visita nuestros:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/legal/terminos">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Términos y Condiciones
                            </button>
                        </Link>
                        <Link href="/legal/envios-devoluciones">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Envíos y Devoluciones
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
