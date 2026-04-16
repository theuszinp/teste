document.addEventListener('DOMContentLoaded', () => {
  const isMobileViewport = () => window.matchMedia('(max-width: 768px)').matches;
  const getScrollOffset = () => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return 96;
    return Math.ceil(nav.getBoundingClientRect().height + 28);
  };
  const openMobileQuoteCTA = () => {
    window.open(
      'https://wa.me/5571984553633?text=Ol%C3%A1%2C%20quero%20uma%20cota%C3%A7%C3%A3o%20r%C3%A1pida%20para%20meu%20ve%C3%ADculo.',
      '_blank'
    );
  };

  // =============================================
  // MENU MOBILE
  // =============================================
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');
  const sectionNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActiveNavLink = (targetId) => {
    sectionNavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === targetId);
    });
  };
 
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (!icon) return;
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
 
    navLinksItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
            icon.classList.replace('fa-xmark', 'fa-bars');
          }
        }
      });
    });
 
    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }
 
  // =============================================
  // HEADER SHADOW + BACK TO TOP
  // =============================================
  const header = document.querySelector('header');
  const backToTop = document.getElementById('backToTop');
 
  const onScrollUI = () => {
    const y = window.scrollY || 0;
    if (header) {
      header.classList.toggle('scrolled', y > 24);
    }
    if (backToTop) {
      backToTop.style.display = y > 600 ? 'flex' : 'none';
    }
  };
 
  window.addEventListener('scroll', onScrollUI, { passive: true });
  onScrollUI();
 
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
 
  // =============================================
  // REVEAL ON SCROLL (IntersectionObserver)
  // =============================================
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el) => el.classList.add('reveal-pending'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.10 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('show'));
  }

  // =============================================
  // NAV ACTIVE STATE
  // =============================================
  const sections = Array.from(sectionNavLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sectionNavLinks.length) {
    const initialTarget = window.location.hash && document.querySelector(window.location.hash)
      ? window.location.hash
      : sectionNavLinks[0].getAttribute('href');
    setActiveNavLink(initialTarget);
  }

  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveNavLink(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.55],
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  } else if (sectionNavLinks.length) {
    setActiveNavLink(sectionNavLinks[0].getAttribute('href'));
  }
 
  // =============================================
  // FAQ ACCORDION
  // =============================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((x) => x.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
 
  // =============================================
  // PLANOS → FORMULÁRIO
  // =============================================
  const planSelect = document.getElementById('plano');
  const pickPlanButtons = document.querySelectorAll('.pick-plan');
 
  const scrollToQuote = () => {
    if (isMobileViewport()) {
      openMobileQuoteCTA();
      return;
    }

    const quote = document.getElementById('cotacao');
    if (quote) {
      const offset = getScrollOffset();
      const top = quote.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };
 
  pickPlanButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || '';
      if (planSelect && plan) planSelect.value = plan;
      scrollToQuote();
    });
  });
 
  // =============================================
  // MÁSCARA TELEFONE (BR)
  // =============================================
  const telefoneInput = document.getElementById('telefone');
 
  const maskPhoneBR = (value) => {
    const digits = (value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      const p1 = digits.slice(0, 2);
      const p2 = digits.slice(2, 6);
      const p3 = digits.slice(6, 10);
      if (!p2) return p1 ? `(${p1}` : '';
      if (!p3) return `(${p1}) ${p2}`;
      return `(${p1}) ${p2}-${p3}`;
    } else {
      const p1 = digits.slice(0, 2);
      const p2 = digits.slice(2, 7);
      const p3 = digits.slice(7, 11);
      if (!p2) return p1 ? `(${p1}` : '';
      if (!p3) return `(${p1}) ${p2}`;
      return `(${p1}) ${p2}-${p3}`;
    }
  };
 
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      const caretPos = e.target.selectionStart;
      e.target.value = maskPhoneBR(e.target.value);
      try { e.target.setSelectionRange(caretPos, caretPos); } catch (_) {}
    });
  }
 
  // =============================================
  // VALIDAÇÃO + FORMULÁRIO WHATSAPP
  // =============================================
  const form = document.getElementById('whatsappForm');
 
  const showError = (fieldId, errorId, msg) => {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = msg;
  };
 
  const clearError = (fieldId, errorId) => {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
  };
 
  // Limpa erros no blur
  ['nome', 'telefone', 'veiculo'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id, `erro-${id}`));
      el.addEventListener('change', () => clearError(id, `erro-${id}`));
    }
  });
 
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
 
      const nome = document.getElementById('nome')?.value?.trim() || '';
      const telefone = document.getElementById('telefone')?.value?.trim() || '';
      const veiculo = document.getElementById('veiculo')?.value || '';
      const plano = document.getElementById('plano')?.value || '';
 
      let hasError = false;
 
      // Validação nome
      if (nome.length < 3) {
        showError('nome', 'erro-nome', 'Por favor, informe seu nome completo.');
        hasError = true;
      } else {
        clearError('nome', 'erro-nome');
      }
 
      // Validação telefone (mínimo 14 chars com máscara = 10 dígitos)
      const digits = telefone.replace(/\D/g, '');
      if (digits.length < 10) {
        showError('telefone', 'erro-telefone', 'Informe um WhatsApp válido com DDD.');
        hasError = true;
      } else {
        clearError('telefone', 'erro-telefone');
      }
 
      // Validação veículo
      if (!veiculo) {
        showError('veiculo', 'erro-veiculo', 'Selecione o tipo de veículo.');
        hasError = true;
      } else {
        clearError('veiculo', 'erro-veiculo');
      }
 
      if (hasError) {
        // Scrolla até o primeiro erro
        const firstError = form.querySelector('.error');
        if (firstError) {
          const top = firstError.getBoundingClientRect().top + window.scrollY - getScrollOffset();
          window.scrollTo({ top, behavior: 'smooth' });
        }
        return;
      }
 
      // Monta mensagem
      const numeroDestino = '5571984553633';
      const linhas = [];
      linhas.push(`Olá! Me chamo *${nome}*.`);
      linhas.push(`Gostaria de uma cotação para: *${veiculo}*.`);
      linhas.push(plano
        ? `Plano de interesse: *${plano}*.`
        : `Plano: *Quero recomendação*.`
      );
      linhas.push(`Meu contato/WhatsApp: ${telefone}`);
 
      const mensagem = linhas.join('\n');
      const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
 
      // Feedback visual no botão
      const submitBtn = document.getElementById('submitBtn');
      const submitText = document.getElementById('submitText');
      const submitIcon = document.getElementById('submitIcon');
 
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Abrindo WhatsApp...';
        if (submitIcon) {
          submitIcon.classList.remove('fa-whatsapp');
          submitIcon.classList.add('fa-spinner', 'fa-spin');
        }
      }
 
      window.open(url, '_blank');
 
      // Restaura botão após 3s
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitText) submitText.textContent = 'Receber Cotação no WhatsApp';
          if (submitIcon) {
            submitIcon.classList.remove('fa-spinner', 'fa-spin');
            submitIcon.classList.add('fa-whatsapp');
          }
        }
      }, 3000);
    });
  }
 
  // =============================================
  // SMOOTH SCROLL para links âncora
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      if (targetId === '#cotacao' && isMobileViewport()) {
        e.preventDefault();
        openMobileQuoteCTA();
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        setActiveNavLink(targetId);
        const offset = getScrollOffset();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
 
});
