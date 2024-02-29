import React, { useState } from 'react';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [fromLang, setFromLang] = useState('auto');
  const [toLang, setToLang] = useState('en');
  const [translationResult, setTranslationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dil seçenekleri
  const languages = {
    auto: 'Otomatik Algılama',
    en: 'İngilizce',
    tr: 'Türkçe',
    de: 'Almanca',
    fr: 'Fransızca',
    es: 'İspanyolca',
  };

  async function translateText() {
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'a341169889mshfdeeb4cfc5e03cep1834b5jsnf959453616ae',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      body: new URLSearchParams({
        from: fromLang,
        to: toLang,
        text: sourceText
      })
    };

    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setTranslationResult(result);
    } catch (error) {
      console.error(error);
      alert('Çeviri sırasında bir hata oluştu: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
    <div style={{ width:"30%", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{textAlign:"center",  width:""}}>Basic Translator</h1>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <textarea
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Write for translation..."
        style={{ minWidth:"300px",maxWidth:"100%", minHeight:"100px"}}
      />
      <div style={{ width:"300px", marginTop:"20px", display:"flex", justifyContent:"space-between"}} id='sourceBox'>
        <label htmlFor="fromLang" style={{ fontWeight:"bolder"}}>Source Language: </label>
        <select
          id="fromLang"
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
          style={{border:"2px solid gray", borderRadius:"5px", padding:"5px"}}
        >
          {Object.entries(languages).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width:"300px", marginTop:"20px", display:"flex", justifyContent:"space-between"}} id='targetBox'>
        <label htmlFor="toLang" style={{ fontWeight:"bolder"}}>Target Language: </label>
        <select
          id="toLang"
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
          style={{border:"2px solid gray", borderRadius:"5px", padding:"5px"}}
        >
          {Object.entries(languages).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={translateText} disabled={isLoading} style={{width:"200px", backgroundColor:"white", color:"Black", fontFamily:"monospace", fontSize:"24px", fontWeight:"bolder", border:"2px solid gray", padding:"5px", borderRadius:"10px", marginTop:"20px"}}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
        <h2>Result:</h2>
      <div style={{ width:"100%", minHeight:"150px", marginTop:"20px", backgroundColor:"white"}}>
      {translationResult && (
        <div style={{ padding:"10px"}}>
          <p>{translationResult?.trans}</p>
        </div>
      )}
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
