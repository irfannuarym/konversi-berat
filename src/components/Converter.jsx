import { useState, useEffect } from 'react';

const units = {
  kg: 1,
  g: 1000,
  lbs: 2.20462,
  oz: 35.274,
};

export default function Converter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('g');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);

  const handleConvert = () => {
    if (!value) return;
    const valueInKg = parseFloat(value) / units[fromUnit];
    const converted = valueInKg * units[toUnit];
    const formattedResult = converted.toFixed(2);

    setResult(formattedResult);

    const entry = `${value} ${fromUnit} = ${formattedResult} ${toUnit}`;
    setHistory([entry, ...history.slice(0, 4)]);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('conversionHistory');
  };

  return (
    <div className="container">
      <h2>Konversi Satuan Berat</h2>

      <input
        type="number"
        placeholder="Masukkan nilai"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
        {Object.keys(units).map((unit) => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>

      <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
        {Object.keys(units).map((unit) => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>

      <button onClick={handleConvert}>Konversi</button>

      <span>Keterangan:</span>
      <p>1 kg = 1.000 g</p>
      <p>1 kg = 2.20462 lbs</p>
      <p>1 kg = 35.274 oz</p>

      {result !== null && (
        <div className="result">Hasil: {result} {toUnit}</div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h4>Riwayat:</h4>
          {history.map((item, index) => (
            <div key={index} className="history-item">{item}</div>
          ))}
          <button className="clear-btn" onClick={clearHistory}>Hapus Riwayat</button>
        </div>
      )}
    </div>
  );
}
