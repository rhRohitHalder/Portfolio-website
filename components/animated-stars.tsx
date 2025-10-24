"use client";

import { useEffect, useRef } from "react";

export function AnimatedStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Star class
    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.speed = 0.1 + Math.random() * 0.3;
        this.alpha = Math.random();
        // Colorful stars
        const colors = [
          "#fff",
          "#ffe066",
          "#f6a4ec",
          "#7afcff",
          "#b388ff",
          "#ff61a6",
          "#ffd6e0",
          "#ffb347",
          "#a3ffd6",
          "#8aff80",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas!.height) {
          this.y = 0;
          this.x = Math.random() * canvas!.width;
        }
        // Twinkling effect
        this.alpha += (Math.random() - 0.5) * 0.1;
        this.alpha = Math.max(0.3, Math.min(1, this.alpha));
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color
          .replace(")", `, ${this.alpha})`)
          .replace("rgb(", "rgba(");
        if (!this.color.startsWith("rgb")) ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    // Meteor (shooting star) class
    class Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      color: string;
      trail: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * (canvas!.height * 0.5);
        this.length = 80 + Math.random() * 60;
        this.speed = 6 + Math.random() * 4;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45deg
        this.alpha = 0.7 + Math.random() * 0.3;
        // Colorful meteors
        const colors = [
          "#fff",
          "#ffe066",
          "#f6a4ec",
          "#7afcff",
          "#b388ff",
          "#ff61a6",
          "#ffd6e0",
          "#ffb347",
          "#a3ffd6",
          "#8aff80",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = 1.5 + Math.random();
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.004 * this.trail;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.strokeStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 16;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
      }

      isAlive() {
        return (
          this.alpha > 0 && this.x < canvas!.width && this.y < canvas!.height
        );
      }
    }

    // Create stars
    const stars: Star[] = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 9000); // Denser for more color
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Meteors
    let meteors: Meteor[] = [];
    let meteorTimer = 0;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw navy blue based gradient background with subtle color
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(10, 20, 60, 0.97)"); // Deep navy
      gradient.addColorStop(0.5, "rgba(24, 40, 90, 0.93)"); // Navy
      gradient.addColorStop(0.8, "rgba(40, 30, 80, 0.90)"); // Subtle purple
      gradient.addColorStop(1, "rgba(20, 30, 50, 0.92)"); // Dark navy
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Meteors logic
      meteorTimer++;
      // Add a new meteor every 80-160 frames (randomized)
      if (meteorTimer > 80 + Math.random() * 80) {
        meteors.push(new Meteor());
        meteorTimer = 0;
      }
      // Update and draw meteors
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
      });
      // Remove dead meteors
      meteors = meteors.filter((m) => m.isAlive());

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
