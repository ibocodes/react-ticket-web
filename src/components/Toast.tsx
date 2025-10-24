/* src/components/Toast.tsx */
export type ToastItem = { id: string; message: string };
export const Toast: React.FC<{ items: ToastItem[] }> = ({ items }) => {
  return (
    <div className="toast-wrap" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast" role="status">{t.message}</div>
      ))}
    </div>
  );
};
