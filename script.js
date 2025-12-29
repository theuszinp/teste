document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Menu Mobile ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            }
        });
    });

    // --- Efeito de Sombra no Header ao rolar ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
        } else {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        }
    });

    // --- LÓGICA DO FORMULÁRIO PARA WHATSAPP ---
    const form = document.getElementById('whatsappForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o recarregamento da página

            // 1. Pega os valores digitados
            const nome = document.getElementById('nome').value;
            const telefoneCliente = document.getElementById('telefone').value;
            const veiculo = document.getElementById('veiculo').value;

            // 2. Número de destino (TrackerCarsat)
            const numeroDestino = "5571981866650";

            // 3. Monta a mensagem
            // \n serve para pular linha
            const mensagem = `Olá! Me chamo *${nome}*.\n` +
                             `Gostaria de uma cotação para o veículo: *${veiculo}*.\n` +
                             `Meu contato/WhatsApp é: ${telefoneCliente}`;

            // 4. Cria o link e abre
            const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
            
            window.open(url, '_blank');
        });
    }
});