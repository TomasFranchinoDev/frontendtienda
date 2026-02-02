import Link from 'next/link';

export const metadata = {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso de nuestra tienda',
};

export default function TermsPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                        Términos y Condiciones
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Última actualización: {new Date().toLocaleDateString('es-ES')}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none space-y-8 text-foreground">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Aceptación de los Términos</h2>
                        <p className="text-muted-foreground">
                            Al acceder y utilizar esta tienda en línea, aceptas estar vinculado por estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestro sitio web. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Uso del Sitio Web</h2>
                        <p className="text-muted-foreground mb-3">
                            El usuario acepta utilizar este sitio web únicamente para propósitos legales y de la manera que no infrinja los derechos de otros ni restrinja su uso y disfrute. Específicamente, el usuario acepta no:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Comportarse de manera abusiva o amenazante</li>
                            <li>Difundir contenido obsceno o sexual</li>
                            <li>Promover discriminación basada en raza, sexo, religión, nacionalidad, discapacidad, orientación sexual o edad</li>
                            <li>Infringir ninguna ley o reglamento</li>
                            <li>Transmitir contenido obsceno u ofensivo</li>
                            <li>Interrumpir el flujo normal de diálogo dentro de nuestro sitio web</li>
                            <li>Intentar acceder no autorizado a nuestros sistemas</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Cuentas de Usuario</h2>
                        <p className="text-muted-foreground mb-3">
                            Si creas una cuenta en nuestro sitio, eres responsable de:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Proporcionar información precisa y completa</li>
                            <li>Mantener la confidencialidad de tu contraseña</li>
                            <li>Notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta</li>
                            <li>Garantizar que solo tú utilizas tu cuenta</li>
                            <li>Aceptar toda responsabilidad por actividades bajo tu cuenta</li>
                        </ul>
                        <p className="mt-3 text-muted-foreground">
                            Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Procesamiento de Pedidos</h2>
                        <p className="text-muted-foreground mb-3">
                            Al realizar un pedido, aceptas que:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>La información que proporcionas es precisa y completa</li>
                            <li>Eres responsable de verificar los detalles de tu pedido antes de confirmar</li>
                            <li>Los precios mostrados están sujetos a cambios sin previo aviso</li>
                            <li>Nos reservamos el derecho de rechazar o cancelar cualquier pedido</li>
                            <li>Los datos de tu tarjeta de crédito se transmiten de forma segura a través de pasarelas de pago certificadas</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Precios y Disponibilidad</h2>
                        <p className="text-muted-foreground">
                            Los precios de los productos están sujetos a cambios sin previo aviso. Nos esforzamos por mantener información precisa de disponibilidad, pero no podemos garantizar que todos los productos en stock mostrados estén disponibles en todo momento. Si un producto se agota después de confirmar tu pedido, nos pondremos en contacto para ofrecerte alternativas o reembolsar el monto.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">6. Métodos de Pago</h2>
                        <p className="text-muted-foreground mb-3">
                            Aceptamos varios métodos de pago seguros:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Tarjetas de crédito y débito (Visa, Mastercard, etc.)</li>
                            <li>Transferencias bancarias</li>
                            <li>Billeteras digitales</li>
                            <li>Otros métodos según lo indicado en el sitio</li>
                        </ul>
                        <p className="mt-3 text-muted-foreground">
                            Todos los pagos se procesan a través de pasarelas seguras certificadas. Tu información de pago es encriptada y no se almacena en nuestros servidores.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">7. Responsabilidad del Usuario</h2>
                        <p className="text-muted-foreground">
                            El usuario es totalmente responsable de cualquier daño o pérdida causado por su uso indebido del sitio web. Esto incluye, entre otros, daños causados por virus, malware o contenido malicioso que pueda resultar del acceso al sitio o descarga de contenido de él.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">8. Limitación de Responsabilidad</h2>
                        <p className="text-muted-foreground">
                            En la medida permitida por la ley, no seremos responsables por ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo pérdida de beneficios, pérdida de datos o pérdida de funcionalidad, resultante del acceso o uso de nuestro sitio web.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">9. Propiedad Intelectual</h2>
                        <p className="text-muted-foreground">
                            Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de la tienda o de sus proveedores de contenido y está protegido por leyes de derechos de autor internacionales. No tienes derecho a reproducir, distribuir o transmitir ningún contenido sin nuestro permiso previo por escrito.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">10. Enlaces de Terceros</h2>
                        <p className="text-muted-foreground">
                            Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables del contenido, precisión o prácticas de estos sitios. El acceso a sitios de terceros está bajo tu propio riesgo. Te recomendamos leer los términos y políticas de privacidad de cualquier sitio de terceros antes de proporcionar información personal.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">11. Renuncia de Garantías</h2>
                        <p className="text-muted-foreground">
                            El sitio web se proporciona "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que el sitio será ininterrumpido, seguro o libre de errores. El uso del sitio es bajo tu responsabilidad exclusiva.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">12. Ley Aplicable</h2>
                        <p className="text-muted-foreground">
                            Estos términos y condiciones están regidos por las leyes aplicables en la jurisdicción donde opera nuestra tienda. Cualquier disputa arising out of o relacionada con estos términos será resuelta exclusivamente en los tribunales de esa jurisdicción.
                        </p>
                    </section>

                    {/* Section 13 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">13. Contacto</h2>
                        <p className="text-muted-foreground">
                            Si tienes preguntas sobre estos términos y condiciones, contáctanos a través de nuestro formulario de contacto o envía un correo electrónico a nuestra dirección de soporte.
                        </p>
                    </section>
                </div>
            </div>

            {/* Back to Home CTA */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
                    <p className="text-muted-foreground mb-4">
                        También puedes revisar nuestras otras políticas:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/legal/privacidad">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Política de Privacidad
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
