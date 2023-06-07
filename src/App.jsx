import { useSpring, animated } from 'react-spring';
import './App.css';
import { Phase } from './components/Phase/Phase';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [scrollX, setScrollX] = useState(0);
  const animatedContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const animatedContainer = animatedContainerRef.current;
      if (animatedContainer) {
        setScrollX(animatedContainer.scrollLeft);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWheel = (event) => {
    const { deltaY } = event;
    const animatedContainer = animatedContainerRef.current;

    if (!animatedContainer) {
      return;
    }

    const containerWidth = animatedContainer.clientWidth;
    const contentWidth = animatedContainer.scrollWidth;

    if (deltaY > 0) {
      if (scrollX + containerWidth < contentWidth) {
        setScrollX((prevScrollX) => prevScrollX + 50);
      }
    } else if (deltaY < 0) {
      if (scrollX > 0) {
        setScrollX((prevScrollX) => prevScrollX - 50);
      }
    }
  };

  const horizontalScrollAnimation = useSpring({
    transform: `translateX(-${scrollX}px)`,
    transition: 'transform 5ms',
  });

  return (
    <div className="app">
      <div style={{ 'overflow': 'hidden' }} onWheel={handleWheel}>
        <h1 className="app__title">
          Roadmap
        </h1>

        <animated.div style={horizontalScrollAnimation}>
          <div className="app__content" ref={animatedContainerRef}>
            <Phase
              title="Phase 1"
              list={[
                'Special events',
                'Launch social networks',
                'Launch token',
                'Launch token on DEX',
              ]}
            />

            <Phase
              title="Phase 2"
              list={[
                'Launch on token CEX',
                'Burn 1% PAND',
                'Staking',
              ]}
            />

            <Phase
              title="Phase 3"
              list={[]}
            />
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default App;
