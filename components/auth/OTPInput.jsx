"use client";

import { useRef, useState, useEffect } from "react";

export default function OTPInput({
  length = 6,
  onChange,
  error,
  autoFocus = true,
}) {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    onChange?.(digits.join(""));
  }, [digits, onChange]);

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const setDigitAt = (index, value) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index, e) => {
    const raw = e.target.value;
    // only keep the last typed character, digits only
    const value = raw.replace(/\D/g, "").slice(-1);

    setDigitAt(index, value);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // clear current box first
        setDigitAt(index, "");
      } else if (index > 0) {
        // already empty → move back and clear that one too
        inputsRef.current[index - 1]?.focus();
        setDigitAt(index - 1, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;

    const next = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);

    const lastFilledIndex = Math.min(pasted.length, length) - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-3" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`
              w-12 h-14 md:w-14 md:h-16 text-center rounded-md bg-bg-input
              font-body text-2xl font-bold text-text-heading
              border ${error ? "border-red-400" : "border-border-light"}
              focus:outline-none focus:ring-2 focus:ring-primary-stroke/40
              transition-shadow
            `}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm font-body text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
