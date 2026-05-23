document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const formPlan = document.getElementById('form-plan');
    const formMessage = document.getElementById('form-message');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    const btnPlanBasico = document.getElementById('btn-plan-basico');
    const btnPlanEstandar = document.getElementById('btn-plan-estandar');
    const btnPlanPremium = document.getElementById('btn-plan-premium');
    const btnPlanPlatinum = document.getElementById('btn-plan-platinum');

    const btnTabAdicionales = document.getElementById('btn-tab-adicionales');
    const btnTabReparaciones = document.getElementById('btn-tab-reparaciones');
    const tabAdicionales = document.getElementById('tab-adicionales');
    const tabReparaciones = document.getElementById('tab-reparaciones');

    const eqRange = document.getElementById('eq-range');
    const eqCount = document.getElementById('eq-count');
    const recPlanName = document.getElementById('rec-plan-name');
    const recPlanFeatures = document.getElementById('rec-plan-features');
    const recPlanPrice = document.getElementById('rec-plan-price');
    const btnCalcSubmit = document.getElementById('btn-calc-submit');

    const btnWhatsappDirect = document.getElementById('btn-whatsapp-direct');
    const btnEmailDirect = document.getElementById('btn-email-direct');
    const btnFormRestart = document.getElementById('btn-form-restart');

    // Estado global de la cotización actual
    let cotizacionTemporal = {
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        plan: "",
        mensaje: ""
    };

    const contactoEmail = 'eduardo.mefig@gmail.com';

    const formatProfessionalMessage = (cotizacion) => {
        return `Hola Merinos Tech!\n\nSolicitud de cotización formal de servicio de TI con la siguiente información:\n\n- Nombre: ${cotizacion.nombre}\n- Empresa: ${cotizacion.empresa}\n- Correo: ${cotizacion.email}\n- Teléfono: ${cotizacion.telefono}\n- Servicio de interés: ${cotizacion.plan}\n- Requerimientos: ${cotizacion.mensaje}\n\nQuedo atento a su respuesta y agradezco la atención.`;
    };

    const formatProfessionalEmailSubject = (cotizacion) => {
        const target = cotizacion.empresa ? cotizacion.empresa : cotizacion.nombre;
        return `Solicitud de Cotización de TI - ${target}`;
    };

    const formatProfessionalEmailBody = (cotizacion) => {
        return `Hola Merinos Tech,%0A%0AQuisiera recibir una propuesta formal de servicio de TI con la siguiente información:%0A%0A- Nombre: ${cotizacion.nombre}%0A- Empresa: ${cotizacion.empresa}%0A- Correo: ${cotizacion.email}%0A- Teléfono: ${cotizacion.telefono}%0A- Servicio de interés: ${cotizacion.plan}%0A- Requerimientos: ${cotizacion.mensaje}%0A%0AQuedo atento a su pronta respuesta.%0A%0AMuchas gracias.%0A%0ASaludos%0A${cotizacion.nombre}`;
    };

    const buildGmailComposeUrl = (to, subject, body) => {
        return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${body}`;
    };

    const buildWhatsAppProfessionalMessage = (cotizacion) => {
        return `Hola Merinos Tech, buen día.\n\nSolicito una cotización formal para servicio de TI para mi empresa.\n\n- Nombre: ${cotizacion.nombre}\n- Empresa: ${cotizacion.empresa}\n- Correo: ${cotizacion.email}\n- Teléfono: ${cotizacion.telefono}\n- Servicio de interés: ${cotizacion.plan}\n- Requerimientos: ${cotizacion.mensaje}\n\n¡Quedo atento, gracias de antemano!`;
    };

    const buildWhatsAppUrl = (phone, message) => {
        return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`;
    };

    // --- MENÚ MÓVIL ---
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.className = 'fa-solid fa-bars text-xl';
        } else {
            menuIcon.className = 'fa-solid fa-xmark text-xl';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.className = 'fa-solid fa-bars text-xl';
        });
    });

    const revealSections = document.querySelectorAll('.reveal-section');
    if (revealSections.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, { threshold: 0.15 });
        revealSections.forEach(section => revealObserver.observe(section));
    }

    const legalLinks = document.querySelectorAll('[data-legal]');
    const legalPanel = document.getElementById('legal-panel');
    const legalContent = document.getElementById('legal-content');
    const legalTitle = document.getElementById('legal-title');
    const legalClose = document.getElementById('legal-close');

    const legalTexts = {
        terminos: {
            title: 'Términos de Servicio',
            html: `
                <p>Al utilizar los servicios de Merinos Tech, usted acepta las condiciones comerciales, los plazos de atención y las reglas de operación de nuestros servicios de soporte.</p>
                <p>Merinos Tech ofrece soporte remoto y presencial, mantenimiento preventivo, reparación de equipos, instalación de redes y consultoría técnica. La descripción exacta del servicio se acuerda antes de iniciar el trabajo y se formaliza en la cotización o contrato correspondiente.</p>
                <ul class="list-disc list-inside space-y-3 text-slate-400 text-sm leading-relaxed">
                    <li>El servicio cubre los elementos expresamente incluidos en la póliza o propuesta formal.</li>
                    <li>Trabajos extraordinarios fuera del alcance se cotizan y facturan por separado.</li>
                    <li>Los tiempos de respuesta se determinan en función de la urgencia, el plan contratado y la accesibilidad a los equipos.</li>
                    <li>El cliente es responsable de proporcionar información veraz, acceso físico o remoto y los recursos necesarios para la atención.</li>
                </ul>
                <p>Merinos Tech realiza los servicios con profesionalismo y buenas prácticas, pero no asegura resultados específicos en casos de daños anteriores, pérdida de datos o configuraciones ajenas no declaradas.</p>
                <p>Para consultas adicionales, por favor comuníquese con nuestro equipo de atención.</p>
            `
        },
        aviso: {
            title: 'Aviso de Privacidad',
            html: `
                <p>En Merinos Tech tomamos muy en serio la privacidad y el uso responsable de sus datos personales.</p>
                <p>Recabamos información para gestionar solicitudes de cotización, brindar atención técnica y enviar comunicaciones relevantes.</p>
                <h4 class="text-sm font-semibold text-white mt-4">Datos recabados</h4>
                <p>Los datos que podemos solicitar incluyen nombre, correo electrónico, teléfono, empresa y descripción de requerimientos.</p>
                <h4 class="text-sm font-semibold text-white mt-4">Finalidad del tratamiento</h4>
                <ul class="list-disc list-inside space-y-3 text-slate-400 text-sm leading-relaxed">
                    <li>Atender solicitudes de cotización y contacto sobre servicios contratados.</li>
                    <li>Enviar información comercial autorizada relacionada con soporte e infraestructura de TI.</li>
                    <li>Proporcionar soporte técnico y seguimiento a incidentes o mantenimientos.</li>
                </ul>
                <h4 class="text-sm font-semibold text-white mt-4">Seguridad y derechos</h4>
                <ul class="list-disc list-inside space-y-3 text-slate-400 text-sm leading-relaxed">
                    <li>Su información se resguarda con medidas técnicas y organizativas para evitar accesos no autorizados.</li>
                    <li>Puede solicitar la rectificación, cancelación o limitación del uso de sus datos personales.</li>
                    <li>Solo compartimos datos con terceros cuando es necesario para cumplir el servicio y bajo acuerdos de confidencialidad.</li>
                </ul>
            `
        }
    };

    const showLegalSection = (type) => {
        const data = legalTexts[type];
        if (!data || !legalPanel || !legalContent || !legalTitle) return;
        legalTitle.textContent = data.title;
        legalContent.innerHTML = data.html;
        legalPanel.classList.remove('hidden');
        legalPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    legalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const type = event.currentTarget.getAttribute('data-legal');
            if (type) showLegalSection(type);
        });
    });

    legalClose?.addEventListener('click', () => {
        legalPanel?.classList.add('hidden');
    });


    // --- MANEJO DE PLANES (CARDS) ---
    function seleccionarPlan(nombrePlan, precio) {
        if (formPlan) formPlan.value = `Póliza Soporte ${nombrePlan === 'Básico' || nombrePlan === 'Estándar' ? 'Preventivo' : 'Correctivo'}`;
        if (formMessage) {
            formMessage.value = `Hola Merinos Tech, me interesa agendar una asesoría técnica para contratar la Póliza Mensual del Plan ${nombrePlan} de $${precio.toLocaleString()} MXN para mi empresa.`;
        }
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }

    btnPlanBasico?.addEventListener('click', () => seleccionarPlan('Básico', 7000));
    btnPlanEstandar?.addEventListener('click', () => seleccionarPlan('Estándar', 9000));
    btnPlanPremium?.addEventListener('click', () => seleccionarPlan('Premium', 12000));
    btnPlanPlatinum?.addEventListener('click', () => seleccionarPlan('Platinum', 16000));


    // --- LÓGICA DE PESTAÑAS (TABS) ---
    function switchTab(tabActive) {
        if (tabActive === 'adicionales') {
            tabAdicionales.classList.remove('hidden');
            tabReparaciones.classList.add('hidden');
            btnTabAdicionales.className = "px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-brand-500 text-slate-950 transition-all duration-200";
            btnTabReparaciones.className = "px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-all duration-200";
        } else {
            tabAdicionales.classList.add('hidden');
            tabReparaciones.classList.remove('hidden');
            btnTabReparaciones.className = "px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-brand-500 text-slate-950 transition-all duration-200";
            btnTabAdicionales.className = "px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-all duration-200";
        }
    }

    btnTabAdicionales?.addEventListener('click', () => switchTab('adicionales'));
    btnTabReparaciones?.addEventListener('click', () => switchTab('reparaciones'));


    // --- CALCULADORA DE INFRAESTRUCTURA ---
    function updateCalculator() {
        if (!eqRange) return;
        const value = parseInt(eqRange.value);
        eqCount.textContent = value === 1 ? '1 Equipo' : `${value} Equipos`;

        if (value <= 15) {
            recPlanName.textContent = 'Plan Básico (Recomendado)';
            recPlanFeatures.textContent = 'Soporte remoto ilimitado de Merinos Tech. Respuestas rápidas ante fallos de red.';
            recPlanPrice.innerHTML = '$7,000* <span class="text-xs text-slate-400 font-normal">/mes</span>';
        } else if (value <= 20) {
            recPlanName.textContent = 'Plan Estándar (Recomendado)';
            recPlanFeatures.textContent = 'Soporte remoto ilimitado + Visitas presenciales según requerimiento técnico.';
            recPlanPrice.innerHTML = '$9,000* <span class="text-xs text-slate-400 font-normal">/mes</span>';
        } else if (value <= 40) {
            recPlanName.textContent = 'Plan Premium (Recomendado)';
            recPlanFeatures.textContent = 'Soporte remoto + 2 días presenciales. Administración integral de servidores.';
            recPlanPrice.innerHTML = '$12,000* <span class="text-xs text-slate-400 font-normal">/mes</span>';
        } else if (value <= 60) {
            recPlanName.textContent = 'Plan Platinum (Recomendado)';
            recPlanFeatures.textContent = 'Soporte remoto + 4 días presenciales. Estrategia de respaldo estricto 3-2-1.';
            recPlanPrice.innerHTML = '$16,000* <span class="text-xs text-slate-400 font-normal">/mes</span>';
        } else {
            recPlanName.textContent = 'Cotización Especial a Medida';
            recPlanFeatures.textContent = 'Soporte avanzado dedicado multiplataforma de gran volumen.';
            recPlanPrice.innerHTML = 'Personalizado <span class="text-xs text-slate-400 font-normal">/mes</span>';
        }
    }

    function enviarCotizacionSeleccionada() {
        const value = parseInt(eqRange.value);
        let planRecomendado = "";
        let inversionText = "";

        if (value <= 15) { planRecomendado = "Póliza Soporte Preventivo"; inversionText = "$7,000 MXN"; }
        else if (value <= 20) { planRecomendado = "Póliza Soporte Preventivo"; inversionText = "$9,000 MXN"; }
        else if (value <= 40) { planRecomendado = "Póliza Soporte Correctivo"; inversionText = "$12,000 MXN"; }
        else if (value <= 60) { planRecomendado = "Póliza Soporte Correctivo"; inversionText = "$16,000 MXN"; }
        else { planRecomendado = "Mantenimiento Servidores"; inversionText = "Precio a convenir"; }

        if (formPlan) {
            formPlan.value = planRecomendado;
        }

        if (formMessage) {
            formMessage.value = `Hola Merinos Tech, utilicé la calculadora inteligente. Requiero una propuesta formal para una infraestructura de ${value} equipos de cómputo. El plan de interés es: ${planRecomendado} (${inversionText}).`;
        }

        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }

    eqRange?.addEventListener('input', updateCalculator);
    btnCalcSubmit?.addEventListener('click', enviarCotizacionSeleccionada);
    
    // Ejecución inicial de la calculadora
    updateCalculator();


    // --- ENVIAR FORMULARIO (CONFIGURADO PARA TEXTO PLANO DE FORMSUBMIT) ---
    contactForm?.addEventListener('submit', (event) => {
        // Enlazamos dinámicamente el valor del input de correo al campo oculto replyto antes del submit nativo
        const clientEmail = document.getElementById('form-email').value.trim();
        const replyToField = document.getElementById('form-replyto');
        if (replyToField) {
            replyToField.value = clientEmail;
        }

        // Cargamos los datos actuales del formulario en el estado global por si el usuario usa los botones de fallback
        cotizacionTemporal.nombre = document.getElementById('form-name').value.trim();
        cotizacionTemporal.empresa = document.getElementById('form-company').value.trim();
        cotizacionTemporal.email = clientEmail;
        cotizacionTemporal.telefono = document.getElementById('form-phone').value.trim();
        cotizacionTemporal.plan = formPlan.value;
        cotizacionTemporal.mensaje = formMessage.value.trim() || "Ninguno";

        // Cambiamos el estado visual del botón
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Enviando solicitud...";
            submitBtn.style.opacity = "0.7";
        }

        // NOTA: No añadimos event.preventDefault() aquí. 
        // Dejamos que FormSubmit reciba los datos de manera nativa e inmediata.
    });

    // --- ENVIAR DATOS ADICIONALES A WHATSAPP DESDE EL MODAL DE ÉXITO ---
    btnWhatsappDirect?.addEventListener('click', () => {
        const url = buildWhatsAppUrl('528334536048', buildWhatsAppProfessionalMessage(cotizacionTemporal));
        window.open(url, '_blank');
    });

    // --- ABRIR GMAIL EN CASO DE FALLBACK ---
    btnEmailDirect?.addEventListener('click', () => {
        const subject = formatProfessionalEmailSubject(cotizacionTemporal);
        const body = formatProfessionalEmailBody(cotizacionTemporal);
        const gmailUrl = buildGmailComposeUrl(contactoEmail, subject, body);
        window.open(gmailUrl, '_blank');
    });

    // --- REINICIAR FORMULARIO ---
    btnFormRestart?.addEventListener('click', () => {
        contactForm?.reset();
        formSuccess?.classList.add('hidden');
    });
});