function FixedButton({ text }) {
  return (
    <button className="fixed bottom-4 right-4 z-10 bg-white text-blue-400 border border-blue-400 px-6 py-2 rounded-md shadow-lg transition-transform transition-colors hover:bg-blue-50 hover:translate-y-1">
      {text}
    </button>
  );
}

export default FixedButton;
