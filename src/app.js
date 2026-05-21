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
    const submitBtn = document.getElementById('submit-btn'); // Vinculado para el estado de carga

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


    // --- MANEJO DE PLANES (CARDS) ---
    function seleccionarPlan(nombrePlan, precio) {
        if (formPlan) formPlan.value = `Plan ${nombrePlan}`;
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

        if (value <= 15) { planRecomendado = "Plan Básico"; inversionText = "$7,000 MXN"; }
        else if (value <= 20) { planRecomendado = "Plan Estándar"; inversionText = "$9,000 MXN"; }
        else if (value <= 40) { planRecomendado = "Plan Premium"; inversionText = "$12,000 MXN"; }
        else if (value <= 60) { planRecomendado = "Plan Platinum"; inversionText = "$16,000 MXN"; }
        else { planRecomendado = "Personalizado"; inversionText = "Precio a convenir"; }

        if (formPlan) {
            formPlan.value = planRecomendado !== "Personalizado" ? planRecomendado : "Ninguno Seleccionado";
        }

        if (formMessage) {
            formMessage.value = `Hola Merinos Tech, utilicé la calculadora inteligente. Requiero una propuesta formal para una infraestructura de ${value} equipos de cómputo. El plan recomendado es el ${planRecomendado} (${inversionText}).`;
        }

        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }

    eqRange?.addEventListener('input', updateCalculator);
    btnCalcSubmit?.addEventListener('click', enviarCotizacionSeleccionada);
    
    // Ejecución inicial de la calculadora
    updateCalculator();


    // --- FORMULARIO DE CONTACTO (MODIFICADO PARA ENVÍO REAL DE CORREO) ---
    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        // Feedback visual de carga en el botón
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Enviando solicitud...";
            submitBtn.style.opacity = "0.7";
        }

        // Recolectar variables actuales del DOM
        cotizacionTemporal.nombre = document.getElementById('form-name').value.trim();
        cotizacionTemporal.empresa = document.getElementById('form-company').value.trim();
        cotizacionTemporal.email = document.getElementById('form-email').value.trim();
        cotizacionTemporal.telefono = document.getElementById('form-phone').value.trim();
        cotizacionTemporal.plan = formPlan.value;
        cotizacionTemporal.mensaje = formMessage.value.trim() || "Ninguno";

        // Mapeo estructurado para que el correo te llegue legible y ordenado
        const datosCorreo = {
            "Nombre del Cliente": cotizacionTemporal.nombre,
            "Empresa / Organización": cotizacionTemporal.empresa,
            "Correo de Contacto": cotizacionTemporal.email,
            "Teléfono": cotizacionTemporal.telefono,
            "Servicio Solicitado": cotizacionTemporal.plan,
            "Mensaje o Requerimientos": cotizacionTemporal.mensaje,
            "_subject": "🚨 Nueva Solicitud de Cotización de TI - " + cotizacionTemporal.empresa
        };

        // Despacho asíncrono vía AJAX/Fetch a FormSubmit
        fetch("https://formsubmit.co/ajax/coronel.lumbreras@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datosCorreo)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la API de correo.');
            return response.json();
        })
        .then(data => {
            console.log("Correo enviado de fondo exitosamente:", data);
            // Mostrar la ventana emergente / panel interactivo de éxito
            formSuccess?.classList.remove('hidden');
        })
        .catch(error => {
            console.error("Fallo de envío:", error);
            alert("No pudimos procesar el correo de forma automática. Por favor, usa el botón de WhatsApp para contactarnos.");
        })
        .finally(() => {
            // Reestablecer propiedades del botón de enviar
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Solicitar Cotización";
                submitBtn.style.opacity = "1";
            }
        });
    });

    // --- ENVIAR DATOS ADICIONALES A WHATSAPP ---
    btnWhatsappDirect?.addEventListener('click', () => {
        const t = cotizacionTemporal;
        const textoWhatsApp = `Hola Merinos Tech!\n\nMe gustaría solicitar una cotización formal:\n*Nombre:* ${t.nombre}\n*Empresa:* ${t.empresa}\n*Teléfono:* ${t.telefono}\n*Servicio:* ${t.plan}\n*Detalles adicionales:* ${t.mensaje}`;
        const url = `https://wa.me/528334536048?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, '_blank');
    });

    // --- REINICIAR FORMULARIO ---
    btnFormRestart?.addEventListener('click', () => {
        contactForm?.reset();
        formSuccess?.classList.add('hidden');
    });
});