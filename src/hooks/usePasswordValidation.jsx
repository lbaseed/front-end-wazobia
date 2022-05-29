import React, { useEffect, useState } from "react";

const usePasswordValidation = ({ password }) => {
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [hasUpperCase, setHasUpperCase] = useState(null);
  const [hasSymbol, setHasSymbol] = useState(null);

  useEffect(() => {
    setValidLength(password.length >= 8 ? true : false);
    setHasUpperCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setHasSymbol(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  }, [password]);

  return [hasUpperCase, validLength, hasNumber, hasSymbol];
};
export default usePasswordValidation;
