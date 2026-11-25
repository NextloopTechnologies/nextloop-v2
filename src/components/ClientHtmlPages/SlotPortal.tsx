import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SlotPortal: React.FC<{ id: string; children: ReactNode }> = ({
  id,
  children,
}) => {
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    setNode(document.getElementById(id));
  }, [id]);

  if (!node) return null;
  return createPortal(children, node);
};

export default SlotPortal;
