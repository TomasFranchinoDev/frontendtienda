import Link from 'next/link';
import { CheckCircle2, Users, Target, Heart } from 'lucide-react';

export const metadata = {
    title: 'Sobre Nosotros',
    description: 'Conoce más sobre nuestra tienda y nuestra historia',
};

export default function AboutPage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div
                className="relative overflow-hidden rounded-none px-6 py-20 sm:px-12 lg:px-16"
                style={{
                    background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`,
                }}
            >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                        Sobre Nosotros
                    </h1>
                    <p className="mt-4 text-lg text-white/90 sm:text-xl">
                        Más de una década comprometidos con la excelencia y la satisfacción del cliente
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Mission Section */}
                <section className="mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Nuestra Misión</h2>
                    <p className="text-lg text-muted-foreground">
                        Proporcionar productos de alta calidad y una experiencia de compra excepcional a precios competitivos. Nos dedicamos a ser el destino de confianza para millones de clientes que buscan variedad, calidad y servicio al cliente responsable.
                    </p>
                </section>

                {/* Vision Section */}
                <section className="mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Nuestra Visión</h2>
                    <p className="text-lg text-muted-foreground">
                        Ser el ecommerce más confiable y accesible de la región, reconocido por nuestra dedicación a la calidad, innovación y excelencia en el servicio. Aspiramos a transformar la experiencia de compra en línea, haciendo que sea más fácil, segura y gratificante para todos nuestros clientes.
                    </p>
                </section>

                {/* Values Section */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">Nuestros Valores</h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="rounded-lg border border-border bg-card p-6">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground">Calidad</h3>
                            <p className="text-sm text-muted-foreground">
                                Cada producto es cuidadosamente seleccionado para cumplir con estándares rigurosos de calidad.
                            </p>
                        </div>

                        <div className="rounded-lg border border-border bg-card p-6">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground">Integridad</h3>
                            <p className="text-sm text-muted-foreground">
                                Operamos con transparencia y honestidad en todos nuestros negocios y relaciones.
                            </p>
                        </div>

                        <div className="rounded-lg border border-border bg-card p-6">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground">Servicio al Cliente</h3>
                            <p className="text-sm text-muted-foreground">
                                Tu satisfacción es nuestra prioridad y nos esforzamos por superar tus expectativas.
                            </p>
                        </div>

                        <div className="rounded-lg border border-border bg-card p-6">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground">Innovación</h3>
                            <p className="text-sm text-muted-foreground">
                                Continuamente mejoramos nuestros servicios para ofrecerte la mejor experiencia.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Nuestra Historia</h2>
                    <p className="text-lg text-muted-foreground">
                        Comenzamos como una pequeña tienda con una visión clara: hacer que el comercio electrónico fuera accesible, seguro y agradable. A lo largo de los años, hemos crecido significativamente, expandiendo nuestro catálogo de productos y mejorando constantemente nuestra infraestructura.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Lo que nos mantiene fiel a nuestros orígenes es nuestro compromiso inquebrantable con la satisfacción del cliente. Cada decisión que tomamos, desde la selección de productos hasta la mejora de nuestro servicio de atención al cliente, se guía por un objetivo: hacer que tu experiencia de compra sea excepcional.
                    </p>
                </section>

                {/* Why Choose Us Section */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">¿Por Qué Elegirnos?</h2>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Amplia Variedad:</strong>
                                <span className="text-muted-foreground"> Miles de productos para todas tus necesidades</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Precios Competitivos:</strong>
                                <span className="text-muted-foreground"> Ofrecemos los mejores precios sin comprometer la calidad</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Envíos Rápidos y Seguros:</strong>
                                <span className="text-muted-foreground"> Entregas confiables con rastreo en tiempo real</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Atención al Cliente 24/7:</strong>
                                <span className="text-muted-foreground"> Estamos aquí para ayudarte en todo momento</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Política de Devoluciones Flexible:</strong>
                                <span className="text-muted-foreground"> 30 días para devolver sin preguntas</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                                <strong className="text-foreground">Seguridad Garantizada:</strong>
                                <span className="text-muted-foreground"> Plataforma encriptada y métodos de pago seguros</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Team Section */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">Nuestro Equipo</h2>
                    <p className="text-lg text-muted-foreground">
                        Contamos con un equipo diverso y apasionado de profesionales dedicados a hacer que tu experiencia de compra sea la mejor posible. Desde nuestro equipo de logística hasta nuestros especialistas en atención al cliente, cada miembro trabaja con un propósito común: tu satisfacción.
                    </p>
                    <div className="rounded-lg border border-border bg-card p-8">
                        <p className="text-center text-muted-foreground">
                            Nuestro equipo está compuesto por expertos en comercio electrónico, tecnología, logística y servicio al cliente, todos unidos por la pasión de transformar la experiencia de compra en línea.
                        </p>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className="mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Nuestro Compromiso</h2>
                    <p className="text-lg text-muted-foreground">
                        Nos comprometemos a:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Proporcionar productos auténticos de alta calidad</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Mantener precios justos y transparentes sin sorpresas ocultas</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Procesar y enviar pedidos de manera rápida y eficiente</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Proteger tu información personal y datos de pago</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Ofrecer un servicio al cliente excepcional y receptivo</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Mantener políticas de devolución justas y flexibles</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Innovar continuamente para mejorar tu experiencia</span>
                        </li>
                    </ul>
                </section>

                {/* Sustainability Section */}
                <section className="mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Responsabilidad Social</h2>
                    <p className="text-lg text-muted-foreground">
                        Creemos en la responsabilidad corporativa y nos esforzamos por minimizar nuestro impacto ambiental. Trabajamos con proveedores que comparten nuestros valores de sostenibilidad y practicamos negocios éticos en todas nuestras operaciones.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Estamos comprometidos con:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Reducir el desperdicio en nuestras operaciones</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Utilizar materiales de embalaje ecológicos cuando sea posible</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Colaborar con proveedores responsables</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>Apoyar iniciativas comunitarias locales</span>
                        </li>
                    </ul>
                </section>

                {/* Contact CTA */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">¿Preguntas?</h2>
                    <p className="text-lg text-muted-foreground">
                        Si tienes preguntas sobre nuestra tienda, productos o servicios, no dudes en contactarnos. Estamos aquí para ayudarte.
                    </p>
                    <div className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
                        <p className="mb-4 text-muted-foreground">
                            Puedes contactar con nuestro equipo escribiendo directamente a nuestra dirección de correo electrónico de soporte.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/">
                                <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                    Inicio
                                </button>
                            </Link>
                            <Link href="/products">
                                <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                    Ver Catálogo
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
