document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // Menu Mobile
  // ---------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links li a');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (!icon) return;

      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinksItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      });
    });
  }

  // ---------------------------
  // Header shadow + Back to top
  // ---------------------------
  const header = document.querySelector('header');
  const backToTop = document.getElementById('backToTop');

  const onScrollUI = () => {
    const y = window.scrollY || 0;

    if (header) {
      header.style.boxShadow = y > 40
        ? '0 10px 30px rgba(0,0,0,0.22)'
        : '0 4px 22px rgba(0,0,0,0.12)';
    }

    if (backToTop) {
      backToTop.style.display = y > 600 ? 'flex' : 'none';
    }
  };

  window.addEventListener('scroll', onScrollUI);
  onScrollUI();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------
  // Reveal on scroll (IntersectionObserver)
  // ---------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    // fallback
    revealEls.forEach((el) => el.classList.add('show'));
  }

  // ---------------------------
  // FAQ accordion
  // ---------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      // fecha os outros
      faqItems.forEach((x) => {
        if (x !== item) x.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  // ---------------------------
  // Botões "pegar plano" e levar pro formulário
  // ---------------------------
  const planSelect = document.getElementById('plano');
  const pickPlanButtons = document.querySelectorAll('.pick-plan');

  const scrollToQuote = () => {
    const quote = document.getElementById('cotacao');
    if (quote) quote.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  pickPlanButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || '';
      if (planSelect) planSelect.value = plan;

      // muda texto do CTA do hero (opcional)
      const heroCta = document.getElementById('heroCta');
      if (heroCta && plan) {
        heroCta.textContent = `Quero cotação: ${plan.split('(')[0].trim()}`;
      }

      scrollToQuote();
    });
  });

  // ---------------------------
  // Máscara simples de telefone (BR)
  // ---------------------------
  const telefoneInput = document.getElementById('telefone');
  const maskPhoneBR = (value) => {
    const digits = (value || '').replace(/\D/g, '').slice(0, 11);

    // (##) #####-#### ou (##) ####-####
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
      const start = e.target.selectionStart;
      e.target.value = maskPhoneBR(e.target.value);
      try { e.target.setSelectionRange(start, start); } catch (_) {}
    });
  }

  // ---------------------------
  // Form WhatsApp (mantendo sua lógica base)
  // ---------------------------
  const form = document.getElementById('whatsappForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value?.trim() || '';
      const telefoneCliente = document.getElementById('telefone')?.value?.trim() || '';
      const veiculo = document.getElementById('veiculo')?.value || '';
      const plano = document.getElementById('plano')?.value || '';

      // Número de destino (TrackerCarsat)
      const numeroDestino = '5571984553633';

      const linhas = [];
      linhas.push(`Olá! Me chamo *${nome}*.`);
      linhas.push(`Gostaria de uma cotação para: *${veiculo}*.`);

      if (plano) {
        linhas.push(`Plano de interesse: *${plano}*.`);
      } else {
        linhas.push(`Plano: *Quero recomendação*.`);
      }

      linhas.push(`Meu contato/WhatsApp é: ${telefoneCliente}`);

      const mensagem = linhas.join('\n');
      const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    });
  }
});
