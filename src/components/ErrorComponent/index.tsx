
"use client";

interface ErrorComponentProps {
  onRetry: () => void;
}

export default function ErrorComponent({ onRetry }: ErrorComponentProps) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Niečo sa pokazilo!</h2>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        Skúsiť znova
      </button>
    </div>
  );
}
