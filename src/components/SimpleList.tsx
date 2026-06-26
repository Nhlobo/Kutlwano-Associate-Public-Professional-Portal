import React from 'react';

type Item = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  meta: string;
};

export function SimpleList({ items, empty }: { items: Item[]; empty?: string }) {
  if (!items.length && empty) {
    return <div className="empty-state">{empty}</div>;
  }
  return (
    <div className="simple-list">
      {items.map((item) => (
        <div className="simple-item" key={item.id}>
          <div className="simple-item-icon">{item.icon}</div>
          <div className="simple-item-body">
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </div>
          <span className="simple-item-meta">{item.meta}</span>
        </div>
      ))}
    </div>
  );
}
