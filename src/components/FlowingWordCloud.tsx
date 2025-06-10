'use client';

import React, { useRef, useEffect, useState } from 'react';
import { wordCloudConfig } from '@/config/wordCloud';

interface Word {
  text: string;
  x: number;
  y: number;
  velocity: number;
  size: number;
  opacity: number;
  targetY: number;
  originalY: number; // Store original Y position for return path
}

// List of words to randomly choose from
const wordList = [
  // Data Science & Machine Learning
  "Data", "Science", "Machine", "Learning", "AI", "Neural", "Network", "Deep", "Models",
  "Analysis", "Pattern", "Recognition", "Algorithm", "Optimization", "Prediction",
  "Visualization", "Statistics", "Mathematics", "Computing", "Intelligence",
  
  // Physics & Dynamics
  "Dynamics", "Systems", "Physics", "Mechanics", "Fluid", "Flow", "Wave", "Oscillation",
  "Vibration", "Resonance", "Harmonic", "Chaos", "Fractal", "Attractor", "Bifurcation",
  "Stability", "Equilibrium", "Trajectory", "Phase", "Space", "Vector", "Field",
  
  // Mathematics
  "Calculus", "Differential", "Equation", "Linear", "Nonlinear", "Algebra", "Geometry",
  "Topology", "Manifold", "Tensor", "Matrix", "Eigenvalue", "Fourier", "Transform",
  "Laplace", "Operator", "Gradient", "Divergence", "Curl", "Integral", "Derivative",
  
  // Additional Terms
  "Simulation", "Modeling", "Computation", "Numerical", "Analytical", "Theoretical",
  "Experimental", "Empirical", "Quantitative", "Qualitative", "Discrete", "Continuous",
  "Stochastic", "Deterministic", "Probabilistic", "Statistical", "Inference", "Estimation"
];

export default function FlowingWordCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();
  const wordsRef = useRef<Word[]>([]);
  const lastWordTimeRef = useRef<number>(0);

  // Function to create a new word
  const createNewWord = (width: number, height: number): Word => {
    const text = wordList[Math.floor(Math.random() * wordList.length)];
    const size = Math.floor(Math.random() * (wordCloudConfig.wordSettings.maxSize - wordCloudConfig.wordSettings.minSize + 1)) + wordCloudConfig.wordSettings.minSize;
    const y = Math.random() * (height - 40) + 20;
    
    return {
      text,
      x: width + Math.random() * 100,
      y,
      targetY: y,
      originalY: y,
      velocity: wordCloudConfig.flowSpeed,
      size,
      opacity: wordCloudConfig.wordSettings.opacity
    };
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });

      // Initialize with some words
      wordsRef.current = Array.from({ length: 10 }, () => createNewWord(width, height));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Title area (oval) - centered in the page
      const titleX = dimensions.width / 4.25;
      const titleY = dimensions.height / 2;
      const titleWidth = wordCloudConfig.titleArea.width;
      const titleHeight = wordCloudConfig.titleArea.height;

      // Add new word based on generation rate
      if (timestamp - lastWordTimeRef.current > wordCloudConfig.wordGenerationRate) {
        wordsRef.current.push(createNewWord(dimensions.width, dimensions.height));
        lastWordTimeRef.current = timestamp;
      }

      // Update and draw words
      wordsRef.current = wordsRef.current.filter(word => {
        // Move word horizontally
        word.x -= word.velocity;

        // Check if word is approaching the oval
        const dx = (word.x - titleX) / (titleWidth / 2);
        const dy = (word.y - titleY) / (titleHeight / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Start curving earlier (increased radius)
        if (distance < 3) {
          // Calculate avoidance force based on distance
          const force = Math.max(0, 1 - distance/3) * 2;
          
          // Calculate target Y position based on word's position relative to oval
          const angle = Math.atan2(word.y - titleY, word.x - titleX);
          const targetOffset = Math.sign(word.y - titleY) * titleHeight * 1.2; // Increased offset
          word.targetY = titleY + targetOffset;
          
          // Smoothly interpolate Y position with easing
          const easing = 0.08; // Reduced for smoother movement
          word.y += (word.targetY - word.y) * easing;
          
          // Adjust opacity based on distance
          word.opacity = 0.3 + (1 - force) * 0.6;
        } else {
          // Gradually return to original path
          const returnEasing = 0.05; // Slower return for smoother transition
          word.y += (word.originalY - word.y) * returnEasing;
          
          // Gradually return to original opacity
          word.opacity += (wordCloudConfig.wordSettings.opacity - word.opacity) * 0.1;
        }

        // Keep words within vertical bounds
        if (word.y < 20) word.y = 20;
        if (word.y > dimensions.height - 20) word.y = dimensions.height - 20;

        // Remove word if it goes off screen
        if (word.x < -100) {
          return false;
        }

        // Draw word
        ctx.font = `${word.size}px Inter`;
        ctx.fillStyle = `rgba(255, 255, 255, ${word.opacity})`;
        ctx.fillText(word.text, word.x, word.y);

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
} 