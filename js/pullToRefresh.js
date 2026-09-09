document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.login-wrapper') || document.body;
    const loader = document.getElementById('pull-refresh-loader');

    let startY = 0;
    let distance = 0;
    const threshold = 70; // Distância em pixels necessária para disparar o refresh
    let isPulling = false;

    container.addEventListener('touchstart', (e) => {
        // Apenas inicia o gesto se o utilizador estiver no topo
        if (container.scrollTop === 0) {
            startY = e.touches[0].pageY;
            isPulling = true;
        }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isPulling) return;

        const currentY = e.touches[0].pageY;
        distance = currentY - startY;

        // Se estiver a puxar para baixo a partir do topo
        if (distance > 0 && container.scrollTop === 0) {
            // Efeito de resistência para o movimento ficar suave
            const pullProgress = Math.min(distance / threshold, 1);

            if (loader) {
                loader.style.opacity = `${pullProgress}`;
                loader.style.transform = `translateX(-50%) scale(${pullProgress}) rotate(${distance * 2}deg)`;
            }
        }
    }, { passive: true });

    container.addEventListener('touchend', () => {
        if (!isPulling) return;
        isPulling = false;

        // Se ultrapassou o limite, executa o reload
        if (distance >= threshold) {
            if (loader) {
                loader.classList.add('refreshing');
            }
            setTimeout(() => {
                window.location.reload();
            }, 350);
        } else {
            // Volta ao estado original caso tenha soltado antes do limite
            if (loader) {
                loader.style.opacity = '0';
                loader.style.transform = 'translateX(-50%) scale(0)';
            }
        }
        distance = 0;
    });
});