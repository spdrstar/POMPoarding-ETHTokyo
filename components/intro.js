import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import intro from '../public/intro.json';
import outro from '../public/outro.json';
import { Button } from "@nextui-org/react";

const FullScreenLottie = ({ animationData }) => {
    const containerRef = useRef();
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(intro);
    const [isSecondAnimationPlaying, setIsSecondAnimationPlaying] = useState(false);
  
    useEffect(() => {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: currentAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice', // Add this line
        },
      });
  
      animation.addEventListener('complete', () => {
          setIsAnimationComplete(true);
      });
  
      return () => {
        animation.destroy();
      };
    }, [currentAnimation]);

    const handleButtonClick = () => {
        setCurrentAnimation(outro);
        setIsSecondAnimationPlaying(true);
    };
  
    return (
    <>
     <div
        ref={containerRef}
        style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            overflow: 'hidden',
          }}
      ></div>
      {isAnimationComplete && !isSecondAnimationPlaying && 
        <Button 
            style={{
                position: "fixed", 
                top: "70%", 
                left: "50%", 
                transform: "translate(-50%, -50%)", 
                background: "#000", 
                fontFamily: "Manrope" 
            }} 
            size="lg"
            onClick={handleButtonClick}
        >
            Continue
        </Button>}
    </>
    );
  };

const Intro = () => {
  return <FullScreenLottie animationData={intro} />;
};

export default Intro;
