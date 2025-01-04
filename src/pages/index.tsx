import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const words = ['PARCHIS', 'CLUEDO', 'LANGOSTA', 'DOMINICAL', 'ACERO', 'PERFUME', 'MINUTO', 'CANARIAS', 'PASTA ITALIANA', 'ESTACIÓN', 'VIETNAM', 'BARBERO', 'AJEDREZ', 'COMIDA RÁPIDA', 'HELADO', 'CARA', 'FISCAL', 'CARDENAL', 'TROMPETA', 'SOLTERONA', 'DEBER', 'LOS ANGELES', 'PUENTE LEVADIZO', 'OREJERAS', 'PEREGRINO', 'TOCAR', 'MOZART', 'DIADEMA', 'SODA', 'PATO DONALD', 'BUCEAR', 'AIRE', 'PARRILLA', 'LEOPARDO', 'FUERA DE LÍMITE', 'SONAJERO', 'ESCLAVO', 'EMPUJAR', 'REMO', 'SANTO', 'FANTASMA', 'DEBATE', 'SONROJARSE', 'LOBO DE MAR', 'PROPAGANDA', 'LUCES DE NEÓN', 'RAYOS X', 'POSTER', 'SEVILLANAS', 'BATMAN', 'CAFE', 'ATAÚD', 'INVENTOR', 'ESTÚPIDO', 'BALLENA', 'ESTÓMAGO', 'ALGODÓN AZÚCAR', 'VIERNES', 'MALABARISTA', 'BOLA NAFTALINA', 'PLEGAR', 'ALTO'];
  const [word, setWord] = useState("");
  const [time, setTime] = useState(Math.floor(Math.random() * (75 - 45) + 45));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundIntervalRef = useRef<NodeJS.Timeout | null>(null);
  let buttonText = isRunning ? "Pausar" : "Reanudar";

  // Muestra una palabra aleatoria y la elimina de la lista
  const displayWord = () => {
    if (words.length === 0) {
      showAlert("Se han acabado las palabras");
      resetClock();
      return;
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    //words.current = words.filter((w) => w !== randomWord); // Elimina la palabra usada
    words.splice(words.indexOf(randomWord), 1);
  };

  // Temporizador
  const nextTime = () => {
    setTime((prevTime) => {
      if (prevTime > 1) {
        return prevTime - 1;
      } else {
        showAlert("Se ha acabado el tiempo");
        pause();
        return 0;
      }
    });
  };

  // Manejo del botón de pausa/reanudar
  const buttonAction = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };

  // Pausa el juego
  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
    setIsRunning(false);
  };

  // Reanuda el juego
  const resume = () => {
    intervalRef.current = setInterval(() => {
      nextTime();
    }, 1000);

    soundIntervalRef.current = setInterval(() => {
      playSoundBasedOnTime();
    }, 1000);

    setIsRunning(true);
  };

  // Resetea el reloj y la lista de palabras
  const resetClock = () => {
    pause();
    setTime(Math.floor(Math.random() * (75 - 45) + 45));
    setWord("");
  };

  // Lógica de sonidos (ejemplo)
  const playSoundBasedOnTime = () => {
    console.log("Sonido según el tiempo:", time);
  };

  // Muestra alertas
  const showAlert = (message: string) => {
    alert(message);
  };

  // Llama a `displayWord` al iniciar
  useEffect(() => {
    displayWord();
    return () => {
      pause(); // Limpia intervalos al desmontar
    };
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center p-3">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-sm text-center font-[family-name:var(--font-geist-mono)] h-60 items-center flex">
          <p className="mb-2 text-6xl sm:text-7xl font-bold">
            {word}{" "}
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            target="_blank"
            rel="noopener noreferrer"
            onClick={displayWord}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Siguiente
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            target="_blank"
            rel="noopener noreferrer"
            onClick={buttonAction}
          >
            {buttonText}
          </a>
        </div>
      </main>
    </div>
  );
}
