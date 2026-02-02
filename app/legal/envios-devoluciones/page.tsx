import Link from 'next/link';

export const metadata = {
    title: 'Envíos y Devoluciones',
    description: 'Política de envíos y devoluciones de nuestra tienda',
};

export default function ShippingReturnsPage() {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                        Envíos y Devoluciones
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Última actualización: {new Date().toLocaleDateString('es-ES')}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none space-y-8 text-foreground">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Política de Envíos</h2>
                        <p className="text-muted-foreground">
                            Nos comprometemos a procesar y enviar tu pedido de manera rápida y segura. Todos nuestros envíos se realizan a través de proveedores de logística confiables con rastreo completo.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Plazos de Entrega</h2>
                        <p className="text-muted-foreground mb-3">
                            Los plazos de envío varían según la ubicación y el método de envío seleccionado:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li><strong>Envío Estándar:</strong> 5-10 días hábiles después de la confirmación del pedido</li>
                            <li><strong>Envío Express:</strong> 2-5 días hábiles después de la confirmación del pedido</li>
                            <li><strong>Envío Internacional:</strong> 10-30 días hábiles (según destino)</li>
                        </ul>
                        <p className="mt-3 text-muted-foreground">
                            Estos son estimados y no garantías. Los tiempos pueden variar por factores fuera de nuestro control como condiciones climáticas o congestión en aduanas.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Costos de Envío</h2>
                        <p className="text-muted-foreground mb-3">
                            Los costos de envío se calculan en el carrito basándose en:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Peso y dimensiones del paquete</li>
                            <li>Ubicación de entrega</li>
                            <li>Método de envío seleccionado</li>
                            <li>Cantidad y naturaleza de los artículos</li>
                        </ul>
                        <p className="mt-3 text-muted-foreground">
                            Ofrecemos envío gratis en compras superiores a un monto determinado. Consulta el sitio para conocer las condiciones actuales.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Rastreo del Pedido</h2>
                        <p className="text-muted-foreground">
                            Una vez que tu pedido sea enviado, recibirás un número de rastreo por correo electrónico. Puedes usar este número para monitorear el estado de tu entrega en tiempo real a través del sitio web del transportista. Te recomendamos proporcionar un número de teléfono válido para facilitar la entrega.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Recepción del Pedido</h2>
                        <p className="text-muted-foreground mb-3">
                            Es tu responsabilidad:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Estar disponible o dejar instrucciones de entrega claras</li>
                            <li>Inspeccionar el paquete al recibirlo</li>
                            <li>Reportar daños visibles o artículos faltantes dentro de 48 horas</li>
                            <li>Conservar el embalaje original para posibles devoluciones</li>
                            <li>Firmar o confirmar la recepción cuando sea requerido</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">6. Entregas Fallidas</h2>
                        <p className="text-muted-foreground mb-3">
                            Si el transportista no logra entregar tu pedido:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Recibirás una notificación con instrucciones de reintentos</li>
                            <li>Generalmente se realizan 2-3 intentos de entrega</li>
                            <li>Si los intentos fallan, el paquete será devuelto a nuestras instalaciones</li>
                            <li>Te contactaremos para coordinar una solución</li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">7. Política de Devoluciones</h2>
                        <p className="text-muted-foreground">
                            Puedes devolver un artículo dentro de <strong>30 días</strong> desde la recepción del pedido. El producto debe estar en condiciones de reventa: sin usar, sin daños, con etiquetas originales intactas y en su embalaje original.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">8. Artículos No Retornables</h2>
                        <p className="text-muted-foreground mb-3">
                            Los siguientes artículos NO pueden ser devueltos:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Artículos personalizados o hecho a medida</li>
                            <li>Artículos digitales o descargas digitales</li>
                            <li>Artículos dañados por uso indebido del cliente</li>
                            <li>Artículos sin etiquetas originales</li>
                            <li>Productos de higiene abiertos o usados</li>
                            <li>Artículos comprados en liquidación final</li>
                        </ul>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">9. Proceso de Devolución</h2>
                        <p className="text-muted-foreground mb-3">
                            Para devolver un artículo:
                        </p>
                        <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
                            <li><strong>Paso 1:</strong> Contacta a nuestro equipo de atención al cliente con tu número de pedido</li>
                            <li><strong>Paso 2:</strong> Se te proporcionará una dirección de devolución y una etiqueta de envío</li>
                            <li><strong>Paso 3:</strong> Empaca el artículo de manera segura en su embalaje original</li>
                            <li><strong>Paso 4:</strong> Envía el paquete a la dirección indicada, preferentemente con rastreo</li>
                            <li><strong>Paso 5:</strong> Una vez recibido y verificado, procesaremos tu reembolso</li>
                        </ul>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">10. Reembolsos</h2>
                        <p className="text-muted-foreground mb-3">
                            Los reembolsos se procesan una vez que verificamos el artículo devuelto:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>El reembolso se acreditará al método de pago original</li>
                            <li>El procesamiento puede tardar 5-10 días hábiles después de nuestra verificación</li>
                            <li>Los bancos pueden tardar días adicionales en reflejar el crédito</li>
                            <li>No incluye el costo original de envío (excepto por error nuestro)</li>
                        </ul>
                    </section>

                    {/* Section 11 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">11. Cambios de Artículos</h2>
                        <p className="text-muted-foreground">
                            Si necesitas cambiar un artículo por otra talla, color u otro producto, puedes hacerlo dentro de <strong>30 días</strong> desde la recepción. El artículo debe estar en condiciones de reventa. El costo de retorno y reenvío puede aplicarse según la política vigente.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">12. Artículos Defectuosos o Dañados</h2>
                        <p className="text-muted-foreground mb-3">
                            Si recibes un artículo defectuoso o dañado:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                            <li>Reporta el problema dentro de 48 horas desde la recepción</li>
                            <li>Proporciona fotografías del defecto o daño</li>
                            <li>Te ofreceremos un reembolso completo o un artículo de reemplazo sin costo</li>
                            <li>El costo de retorno será cubierto por nosotros</li>
                        </ul>
                    </section>

                    {/* Section 13 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">13. Responsabilidad de Envío</h2>
                        <p className="text-muted-foreground">
                            Aunque aseguramos todos los envíos, asumimos responsabilidad solo hasta el punto de entrega. Una vez que el transportista confirma la entrega, cualquier daño posterior es responsabilidad del cliente. Te recomendamos inspeccionar el paquete inmediatamente al recibirlo y reportar daños de inmediato.
                        </p>
                    </section>

                    {/* Section 14 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">14. Direcciones Incompletas</h2>
                        <p className="text-muted-foreground">
                            Si proporcionas una dirección incompleta o incorrecta, contactaremos contigo para confirmar. Si el envío se retrasa o se pierde debido a información incompleta, podemos cobrar los costos adicionales de reenvío.
                        </p>
                    </section>

                    {/* Section 15 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">15. Contacto para Devoluciones</h2>
                        <p className="text-muted-foreground">
                            Para iniciar una devolución o reportar problemas con tu envío, contáctanos a través de nuestro formulario de contacto o envía un correo electrónico a nuestra dirección de atención al cliente. Incluye tu número de pedido y una descripción del problema.
                        </p>
                    </section>
                </div>
            </div>

            {/* Back to Home CTA */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
                    <p className="text-muted-foreground mb-4">
                        También te pueden interesar nuestras otras políticas:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/legal/privacidad">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Política de Privacidad
                            </button>
                        </Link>
                        <Link href="/legal/terminos">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Términos y Condiciones
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
