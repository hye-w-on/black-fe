import { useState } from 'react';
import { useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageTransitionMotionOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);

  return (
    <motion.div
      style={{
        position: 'absolute',
      }}
      animate={{ opacity: [0, 1] }}
      transition={{ type: 'tween' }}
      exit={{ opacity: [1, 0] }}
      /* Slide
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5 }}
      */
      /* Blur
          initial={{ opacity: 0, filter: 'blur(30px)' }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
          }}
          exit={{
            opacity: 0,
            filter: 'blur(30px)',
            transition: { duration: 0.5 },
          }}
      */
    >
      {outlet}
    </motion.div>
  );
}
