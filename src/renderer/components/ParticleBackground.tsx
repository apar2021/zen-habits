import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(24, 24, 27, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}; 